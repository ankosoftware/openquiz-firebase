import {AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";
import {Thenable} from "firebase";
import {Base} from "../../model/base.model";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ObservableInput} from "rxjs/Observable";
import {UIRouter} from "ui-router-ng2";
import {Query} from "angularfire2/interfaces";
import {FirebasePage} from "./firebasepage";
import {User} from "../../model/user.model";

export abstract class FirebaseService<T extends Base> {

  db: AngularFireDatabase;
  protected user: User;

  constructor(protected af: AngularFire, protected uiRouter: UIRouter, private url: string) {
    this.db = af.database;
    this.getUser().then(() => {
    });
  }

  protected getUser(): Promise<User> {
    return this.af.auth.first().toPromise().then(data => {
      let user = data && data.auth && new User(data.auth);
      if (user) {
        user.owner = user.uid;
      }
      this.user = user;
      return user;
    });
  }

  protected abstract toModel(json: any): T;

  protected resToModel(json: any): T {
    if (!json) {
      return json;
    }
    if (json.$exists && !json.$exists()) {
      return null;
    }
    return this.toModel(json);
  }

  protected onCatch(err: any, caught?: any) {
    console.log('DB Error', err);
    if (err && err.code === "PERMISSION_DENIED") {
      this.uiRouter.stateService.go('login');
    }
  }

  protected errorHandler(err: any, caught: Observable<any>): ObservableInput<{}> {
    this.onCatch(err, caught);
    throw err;
  }

  protected arrayToModel(array: any[]): T[] {
    return array && array.map((json) => this.resToModel(json));
  }

  protected object(key: string): FirebaseObjectObservable<T> {
    return this.db.object(this.url + `/${key}`);
  }

  protected items(query: Query = {}): FirebaseListObservable<T[]> {
    return this.db.list(this.url, {query});
  }

  create(item: T): Promise<T> {
    if (this.user != null) {
      item.owner = this.user.uid;
      return this.createInternal(item);
    } else {
      return this.getUser().then(() => {
        if (this.user === null) {
          throw new Error('Not authorized');
        } else {
          item.owner = this.user.uid;
          return this.createInternal(item);
        }
      });
    }
  }

  createInternal(item: T): Promise<T> {
    return item && this.items()
        .push(item.toJSON()).catch(err => this.onCatch(err))
        .then(ref => this.get(ref.key).first().toPromise());
  }

  list(query?: Query, skip?: number, limit?: number): Promise<FirebasePage<T>> {
    return this.items(query).map(json => {
      let skiped = +skip || 0;
      let limited = +limit || 0;
      let length = json && json.length || 0;
      let data = json && (skiped || limited) ? limited > 0
        ? json.splice(skiped, limited) : json.splice(skiped)
        : json;
      return {
        data: this.arrayToModel(data),
        length: length
      }
    }).catch((err, caught) => this.errorHandler(err, caught)).first().toPromise();
  }

  getList(keys: string[]): Promise<T[]> {
    if (!keys && !keys.map) {
      return;
    }
    let promises = keys.map(key => this.get(key).first().toPromise());
    return Promise.all(promises);
  }

  get(key: string): Observable<T> {
    return key && this.object(key).map(json => this.resToModel(json)).catch((err, caught) => this.errorHandler(err, caught));
  }

  updateById(key: string, item: T): Thenable<void> {
    return item && key && this.object(key).update(item.toJSON()).catch(err => this.onCatch(err));
  }

  update(item: T): Thenable<void> {
    return item && item.id && this.object(item.id).update(item.toJSON()).catch(err => this.onCatch(err));
  }

  remove(key: string): Thenable<void> {
    return key && this.items().remove(key).catch(err => this.onCatch(err));
  }

  query(): firebase.database.Query {
    return this.db.list(this.url).$ref;
  }
}

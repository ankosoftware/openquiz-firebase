import {AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";
import {Thenable} from "firebase";
import {Base} from "../../model/base.model";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ObservableInput} from "rxjs/Observable";
import {UIRouter} from "ui-router-ng2";

export abstract class FirebaseService<T extends Base> {

  db: AngularFireDatabase;

  constructor(af: AngularFire, protected uiRouter: UIRouter, private url: string) {
    this.db = af.database;
  }

  protected abstract toModel(json: any): T;

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
    return array && array.map(this.toModel);
  }

  protected object(key: string): FirebaseObjectObservable<T> {
    return this.db.object(this.url + `/${key}`);
  }

  protected items(): FirebaseListObservable<T[]> {
    return this.db.list(this.url);
  }

  create(item: T): Thenable<T> {
    return item && this.items().push(item.toDB()).catch(err => this.onCatch(err)).then(this.toModel);
  }

  list(query?: any): Observable<T[]> {
    return this.items().map(json => this.arrayToModel(json)).catch((err, caught) => this.errorHandler(err, caught));
  }

  get(key: string): Observable<T> {
    return key && this.object(key).map(json => this.toModel(json)).catch((err, caught) => this.errorHandler(err, caught));
  }

  update(item: T): Thenable<void> {
    return item && item.id && this.object(item.id).update(item.toDB()).catch(err => this.onCatch(err));
  }

  remove(key): Thenable<void> {
    return key && this.items().remove(key).catch(err => this.onCatch(err));
  }

}

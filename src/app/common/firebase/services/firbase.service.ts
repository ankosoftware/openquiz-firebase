import {AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";
import {Thenable} from "firebase";
import {Base} from "../../model/base.model";
import "rxjs/add/operator/map";

export abstract class FirebaseService<T extends Base> {

  db: AngularFireDatabase;

  constructor(af: AngularFire, private url: string) {
    this.db = af.database;
  }

  protected abstract toModel(json: any): T;

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
    return item && this.items().push(item.toDB()).then(this.toModel);
  }

  list(query?: any): Observable<T[]> {
    let res = new Observable();
    //this.items().subscribe();//.subscribe(this.arrayToModel);
    return this.items().map(json => this.arrayToModel(json));
  }

  get(key: string): Observable<T> {
    return key && this.object(key).map(json => this.toModel(json));
  }

  update(item: T): Thenable<void> {
    return item && item.id && this.items().update(item.id, item.toDB());
  }

  remove(key): Thenable<void> {
    return key && this.items().remove(key);
  }

}

import {AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Observable} from "rxjs";
import {Thenable} from "firebase";
import {Base} from "../../model/base.model";

export abstract class FirebaseService<T extends Base> {

  db: AngularFireDatabase;

  constructor(af: AngularFire, private url: string) {
    this.db = af.database;
  }

  abstract toModel(json: any): T;

  protected object(): FirebaseObjectObservable<T> {
    return this.db.object(this.url);
  }

  protected items(): FirebaseListObservable<T[]> {
    return this.db.list(this.url);
  }

  create(item: T): Thenable<T> {
    return item && this.items().push(item.toDB()).then(this.toModel);
  }

  list(query: any): Thenable<Array<T>> {
    return null;
  }

  get(): Observable<T> {
    return null;
  }

  update(item: T): Thenable<void> {
    return item && this.items().update(item.id, item.toDB());
  }

  remove(key): Thenable<void> {
    return key && this.items().remove(key);
  }

}

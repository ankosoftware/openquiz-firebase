import {Injectable} from "@angular/core";
import {AngularFire, AngularFireDatabase} from "angularfire2";
import {Observable} from "rxjs";

export abstract class FirebaseService<T> {

  db: AngularFireDatabase;

  constructor(af: AngularFire, private url: string) {
    this.db = af.database;
  }
  abstract toModel(json:any):T;

  create(item:T):Observable<T> {
    return null;
  }

  list(query:any):Observable<Array<T>> {
    return null;
  }

  get(): Observable<T> {
    return null;
  }

  update():Observable<T> {
    return null;
  }
  remove():Observable<T> {
    return null;
  }

}

import {Injectable} from "@angular/core";
import {AngularFire, AngularFireDatabase} from "angularfire2";

@Injectable()

export class FirebaseService {

  db: AngularFireDatabase;

  constructor(af: AngularFire) {
    this.db = af.database;
  }
}

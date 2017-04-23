import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {AngularFire} from "angularfire2";
import {UIRouter} from "ui-router-ng2";
import {Superuser} from "../../model/superuser.model";

@Injectable()
export class SuperuserService extends FirebaseService<Superuser> {

  constructor(af: AngularFire, uiRouter: UIRouter) {
    super(af, uiRouter, 'superuser');
  }

  toModel(json: any): Superuser {
    return new Superuser(json);
  }
}

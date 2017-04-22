import {Injectable} from "@angular/core";
import {AngularFire, AuthMethods, AuthProviders} from "angularfire2";
import "rxjs/add/operator/map";
import {User} from "../../model/user.model";

@Injectable()

export class AuthService {
  constructor(private af: AngularFire) {
  }
  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect});
  }
  loginGithub() {
    this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Redirect});
  }
  loginFacebook() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect});
  }
  logout() {
    return this.af.auth.logout();
  }
  getUser():Promise<User> {
    return this.af.auth.first().toPromise().then((data) => data && data.auth);
  }
}

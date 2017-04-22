import {Injectable} from "@angular/core";
import {AngularFire, AuthMethods, AuthProviders} from "angularfire2";
import "rxjs/add/operator/map";

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
    this.af.auth.login();
  }
  getUser() {
    return this.af.auth.map((data)=>{
      return data && data.auth;
    }).first().toPromise();
  }
}

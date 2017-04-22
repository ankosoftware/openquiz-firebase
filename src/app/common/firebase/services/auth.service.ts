import {Injectable} from "@angular/core";
import {AngularFire, AuthMethods, AuthProviders} from "angularfire2";

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
  logout() {
    this.af.auth.login();
  }
}

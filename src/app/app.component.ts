import { Component } from '@angular/core';
import {AuthService} from "./common/firebase/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private authSevice: AuthService) {

  }
  loginGoogle() {
    this.authSevice.loginGoogle();
  }
  loginGithub() {
    this.authSevice.loginGithub();
  }
}

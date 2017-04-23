import {Component, Input, OnInit} from '@angular/core';
import {UIRouter, uiRouterFactory} from "ui-router-ng2";
import {AuthService} from "../firebase/services/auth.service";
import {User} from "../model/user.model";
import { MaterialComponent } from "../components/material/material.component";

@Component({
  inputs:['user'],
  templateUrl: './login.component.html'
})
export class LoginComponent extends MaterialComponent implements OnInit {
  @Input() user: User;
  constructor(private authService: AuthService, protected uiRouter: UIRouter ) {
    super();
  }
  ngOnInit(): void {
    if(this.user) {
      console.log(this.user);
      this.uiRouter.stateService.go('admin');
    }
  }
  loginGoogle() {
    this.authService.loginGoogle();
  }
  loginGithub() {
    this.authService.loginGithub();
  }
  loginFacebook() {
    this.authService.loginFacebook();
  }
}

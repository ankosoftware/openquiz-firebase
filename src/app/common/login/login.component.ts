import {Component, Input, OnInit} from '@angular/core';
import {UIRouter, uiRouterFactory} from "ui-router-ng2";
import {AuthService} from "../firebase/services/auth.service";
import {User} from "../model/user.model";
import { MaterialComponent } from "../components/material/material.component";
import { Transition } from "ui-router-core/lib";

@Component({
  inputs:['user'],
  templateUrl: './login.component.html'
})
export class LoginComponent extends MaterialComponent implements OnInit {
  @Input() user: User;
  constructor(private authService: AuthService, protected uiRouter: UIRouter, protected transition: Transition) {
    super();
  }
  ngOnInit(): void {
    if(this.user) {
      if(this.transition.params().source) {
        window.location.href = decodeURIComponent(this.transition.params().source);
      }
      else {
        this.uiRouter.stateService.go('admin');
      }
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

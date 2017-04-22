import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../common/firebase/services/auth.service";
import {UIRouter} from "ui-router-ng2";
import {User} from "../common/model/user.model";

@Component({
  inputs: ['user'],
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  @Input() user: User;
  constructor(private authService: AuthService, protected uiRouter: UIRouter) {}

  logout() {
    this.authService.logout();
    this.uiRouter.stateService.go('login');
  }
}

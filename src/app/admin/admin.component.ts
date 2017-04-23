import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../common/firebase/services/auth.service";
import {UIRouter} from "ui-router-ng2";
import {User} from "../common/model/user.model";
import { MaterialComponent } from '../common/components/material/material.component';
import {Superuser} from "../common/model/superuser.model";

@Component({
  inputs: ['user', 'superuser'],
  templateUrl: './admin.component.html'
})
export class AdminComponent extends MaterialComponent implements OnInit {
  @Input() user: User;
  @Input() superuser: Superuser;

  constructor(private authService: AuthService, protected uiRouter: UIRouter) {
    super();
  }

  ngOnInit(): void {
    if(!this.user) {
      this.uiRouter.stateService.go('login');
    }
    if(!this.superuser) {
      this.uiRouter.stateService.go('makemeadmin');
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.uiRouter.stateService.go('login');
    });
  }
}

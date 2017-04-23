import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../common/firebase/services/auth.service";
import {UIRouter} from "ui-router-ng2";
import {User} from "../common/model/user.model";
import { MaterialComponent } from '../common/components/material/material.component';

@Component({
  inputs: ['user'],
  templateUrl: './admin.component.html'
})
export class AdminComponent extends MaterialComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService, protected uiRouter: UIRouter) {
    super();
  }

  ngOnInit(): void {
    if(!this.user) {
      this.uiRouter.stateService.go('login');
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.uiRouter.stateService.go('login');
    });
  }
}

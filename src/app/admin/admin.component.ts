import { Component } from '@angular/core';
import {AuthService} from "../common/firebase/services/auth.service";

@Component({
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  user: any = {};

  constructor(private authService: AuthService) {
    this.authService.getUser().then((user)=> {
      this.user = user;
    });
  }
}

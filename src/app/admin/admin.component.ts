import {Component, Input} from '@angular/core';
import {AuthService} from "../common/firebase/services/auth.service";

@Component({
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  @Input() user;
  constructor(private authService: AuthService) {
    console.log('Trace Admin component', this.user);
  }
}

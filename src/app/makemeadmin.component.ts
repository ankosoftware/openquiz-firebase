import {Component, Input, OnInit} from "@angular/core";
import {SuperuserService} from "./common/firebase/services/superuser.service";
import {Superuser} from "./common/model/superuser.model";
import {User} from "./common/model/user.model";
import {UIRouter} from "ui-router-ng2";

@Component({
  selector: 'makemeadmin',
  inputs: ['user'],
  templateUrl: './makemeadmin.component.html'
})
export class MakeMeAdminComponent implements OnInit {
  @Input() user: User;
  private superuser: Superuser;
  private loading = true;

  constructor(private superuserService: SuperuserService, private uiRouter: UIRouter) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.superuserService.get(this.user.uid).first().toPromise().then((superuser) => {
        this.superuser = superuser;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  makeMeAdmin() {
    if (!!this.superuser) {
      console.log('Already admin');
      return;
    }
    if (!this.user) {
      console.log('Not authorized');
      return;
    }
    let su = new Superuser();
    su.displayName = this.user.displayName;
    su.email = this.user.email;
    this.superuserService.updateById(this.user.uid, su).then(() => {
      console.log('Admin crefated');
      this.uiRouter.stateService.go('login');
    });
  }
}

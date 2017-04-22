import { NgModule } from '@angular/core';
import { FirebaseModule } from './firebase/firebase.module';
import { NotFoundComponent } from "./errors/404/not-found.component";
import {routing} from './general.router';
import {LoginComponent} from "./login/login.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {BrowserModule} from "@angular/platform-browser";
import {ConfirmComponent} from "./components/confirm/confirm.component";
import {BootstrapModalModule} from "ng2-bootstrap-modal";

@NgModule({
  imports: [
    BrowserModule,
    FirebaseModule,
    routing,
    BootstrapModalModule
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent,
    PaginationComponent,
    ConfirmComponent
  ],
  exports: [
    PaginationComponent,
    ConfirmComponent
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class GeneralModule {}

import { NgModule } from '@angular/core';
import { FirebaseModule } from './firebase/firebase.module';
import { NotFoundComponent } from "./errors/404/not-found.component";
import {routing} from './general.router';
import {LoginComponent} from "./login/login.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    BrowserModule,
    FirebaseModule,
    routing
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent,
    PaginationComponent
  ],
  exports: [
    PaginationComponent
  ]
})
export class GeneralModule {}

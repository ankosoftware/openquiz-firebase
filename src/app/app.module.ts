import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { GeneralModule } from './common/general.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';

import { routing } from './app.router';
import {MakeMeAdminComponent} from "./makemeadmin.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MakeMeAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BootstrapModalModule,
    GeneralModule,
    AdminModule,
    routing
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

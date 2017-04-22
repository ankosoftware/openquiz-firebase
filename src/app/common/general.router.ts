import { UIRouterModule } from 'ui-router-ng2';
import {NotFoundComponent} from "./errors/404/not-found.component";
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./login/login.component";

export const states = [
  {
    name:'not-found',
    url:'/404',
    component: NotFoundComponent
  },
  {
    name:'login',
    url:'/login',
    component: LoginComponent
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forChild({states});

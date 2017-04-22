import { UIRouterModule } from 'ui-router-ng2';
import {NotFoundComponent} from "./errors/404/not-found.component";
import {ModuleWithProviders} from "@angular/core";

export const states = [
  {
    name:'NotFound',
    url:'/404',
    component: NotFoundComponent
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forChild({states});

import { UIRouterModule } from 'ui-router-ng2';
import { ModuleWithProviders } from '@angular/core';
import {LandingComponent} from "./landing/landing.component";


export const states = [
  {
    name: 'home',
    url: '/',
    component: LandingComponent
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forRoot({states,  otherwise: '/404'});

import { UIRouterModule } from 'ui-router-ng2';
import { ModuleWithProviders } from '@angular/core';
import { LandingComponent } from "./landing/landing.component";
import { AuthService } from "./common/firebase/services/auth.service";

export function resolveUser(authService:AuthService) { return authService.getUser() }

export const states = [
  {
    name: 'home',
    url: '/',
    component: LandingComponent,
    resolve: [{
      token: 'user',
      deps: [AuthService],
      resolveFn: resolveUser
    }]
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forRoot({states,  otherwise: '/404'});

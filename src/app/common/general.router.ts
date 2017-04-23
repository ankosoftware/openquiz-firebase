import { UIRouterModule } from 'ui-router-ng2';
import {NotFoundComponent} from "./errors/404/not-found.component";
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./firebase/services/auth.service";


export function resolveUser(authService: AuthService) {
  return authService.getUser();
}

export const states = [
  {
    name:'not-found',
    url:'/404',
    component: NotFoundComponent
  },
  {
    name:'login',
    url:'/login?:source',
    component: LoginComponent,
    resolve: [{
      token: 'user',
      deps: [AuthService],
      resolveFn: resolveUser
    }]
  },

];

export const routing: ModuleWithProviders = UIRouterModule.forChild({states});

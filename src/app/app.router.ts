import { UIRouterModule } from 'ui-router-ng2';
import { ModuleWithProviders } from '@angular/core';
import { LandingComponent } from "./landing/landing.component";
import { AuthService } from "./common/firebase/services/auth.service";
import { MakeMeAdminComponent } from "./makemeadmin.component";
import {QuizService} from "./common/firebase/services/quiz.service";
import {Query} from "angularfire2/interfaces";

export function resolveUser(authService:AuthService) { return authService.getUser() }
export function resolveQuizzes(quizService: QuizService) {
  const query:Query = {
    orderByChild: 'isPublic',
    equalTo:true
  };
  return quizService.list(query, 0, 10).then((page)=>{
    return page.data;
  });
}

export const states = [
  {
    name: 'home',
    url: '/',
    component: LandingComponent,
    resolve: [{
        token: 'quizzes',
        deps: [QuizService],
        resolveFn: resolveQuizzes
      }]
  },
  {
    name: 'makemeadmin',
    url: '/makemeadmin',
    component: MakeMeAdminComponent,
    resolve: [{
      token: 'user',
      deps: [AuthService],
      resolveFn: resolveUser
    }]
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forRoot({states,  otherwise: '/404'});

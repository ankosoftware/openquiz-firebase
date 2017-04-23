import {ModuleWithProviders} from '@angular/core';
import {UIRouterModule} from 'ui-router-ng2';
import {QuizService} from "../common/firebase/services/quiz.service";
import {Transition} from "ui-router-core/lib";
import {AuthService} from "../common/firebase/services/auth.service";
import {PlayerComponent} from "./player.component";

export function resolveQuiz(quizService: QuizService, transition: Transition)  {
  return quizService.get(transition.params().quizId).first().toPromise();
}

export function resolveUser(authService: AuthService) {
  return authService.getUser();
}

export const states = [{
    name: 'player',
    url: '/player/:quizId',
    component: PlayerComponent,
    resolve: [{
      token: 'user',
      deps: [AuthService],
      resolveFn: resolveUser
    }, {
      token: 'quiz',
      deps: [QuizService, Transition],
      resolveFn: resolveQuiz
    }]
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forChild({ states });

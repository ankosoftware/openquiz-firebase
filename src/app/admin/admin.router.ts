import { ModuleWithProviders } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { AdminComponent } from './admin.component';
import { QuizzesComponent } from './quizzes/list/quizzes.component';
import { QuizComponent } from './quizzes/details/quiz.component';
import { TopicComponent } from './topics/details/topic.component';
import { QuestionComponent } from './questions/question.component';
import { QuizService } from "../common/firebase/services/quiz.service";
import {Transition} from "ui-router-core/lib";
import {AuthService} from "../common/firebase/services/auth.service";
import {TopicService} from "../common/firebase/services/topic.service";
import {Query} from "angularfire2/interfaces";

export function resolveQuizzes(quizService: QuizService, transition: Transition) {
  const query:Query = {
    orderByChild: 'name',
    startAt: +transition.params().skip || 0,
    limitToFirst: +transition.params().limit || 10
  };
  return quizService.list(query).first().toPromise();
}

export function resolveQuiz(quizService: QuizService, transition: Transition)  {
  return quizService.get(transition.params().quizId).first().toPromise();
}

export function resolveUser(authService: AuthService) {
  return authService.getUser();
}

export function resolveTopic(topicService: TopicService, transition: Transition) {
  return topicService.get(transition.params().topicId).first().toPromise();
}

export const states = [
  {
    name: 'admin',
    url: '/admin',
    component: AdminComponent,
    redirectTo: 'admin.quizzes',
    resolve: [{
      token: 'user',
      deps: [AuthService],
      resolveFn: resolveUser
    }]
  },
  {
    name: 'admin.quizzes',
    url: '/quizzes?:skip?:limit',
    component: QuizzesComponent,
    resolve: [{
        token: 'quizzes',
        deps: [QuizService, Transition],
        resolveFn: resolveQuizzes
      }]
  },
  {
    name: 'admin.quiz',
    url: '/quizzes/:quizId',
    component: QuizComponent,
    resolve: [{
      token: 'quiz',
      deps: [QuizService, Transition],
      resolveFn: resolveQuiz
    }]
  },
  {
    name: 'admin.topic',
    url: '/quizzes/:quizId/topic/:topicId',
    component: TopicComponent,
    resolve: [{
        token: 'topic',
        deps: [TopicService, Transition],
        resolveFn: resolveTopic
    }]
  },
  {
    name: 'admin.question',
    url: '/quizzes/:quizId/topic/:topicId/question',
    component: QuestionComponent
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forChild({ states });

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
import {SuperuserService} from "../common/firebase/services/superuser.service";
import {Query} from "angularfire2/interfaces";
import {QuestionService} from "../common/firebase/services/question.service";
import {ResultsComponent} from "./results/results.component";

export function resolveQuizzes(quizService: QuizService, transition: Transition) {
  const query:Query = {
    orderByChild: 'name'
  };
  return quizService.list(query, transition.params().skip, +transition.params().limit || 10);
}

export function resolveQuiz(quizService: QuizService, transition: Transition)  {
  return quizService.get(transition.params().quizId).first().toPromise();
}

export function resolveUser(authService: AuthService) {
  return authService.getUser();
}
export function resolveSuperuser(authService: AuthService, superuserService: SuperuserService) {
  return authService.getUser().then(user => superuserService.get(user.uid).first().toPromise());
}

export function resolveTopic(topicService: TopicService, transition: Transition) {
  return topicService.get(transition.params().topicId).first().toPromise();
}

export function resolveQuestion(questionService: QuestionService, transition:Transition) {
  return questionService.get(transition.params().questionId).first().toPromise();
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
    }, {
      token: 'superuser',
      deps: [AuthService, SuperuserService],
      resolveFn: resolveSuperuser
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
    name: 'admin.quiz_result',
    url: '/quizzes/:quizId/results',
    component: ResultsComponent,
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
    name: 'admin.question_edit',
    url: '/quizzes/:quizId/topic/:topicId/question/:questionId',
    component: QuestionComponent,
    resolve: [{
      token: 'question',
      deps: [QuestionService, Transition],
      resolveFn: resolveQuestion
    }]
  },
  {
    name: 'admin.question',
    url: '/quizzes/:quizId/topic/:topicId/question',
    component: QuestionComponent
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forChild({ states });

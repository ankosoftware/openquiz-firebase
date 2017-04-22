import { ModuleWithProviders } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { AdminComponent } from './admin.component';
import { QuizzesComponent } from './quizzes/list/quizzes.component';
import { QuizComponent } from './quizzes/details/quiz.component';
import { TopicComponent } from './topics/details/topic.component';
import { QuestionComponent } from './questions/question.component';
import { QuizService } from "../common/firebase/services/quiz.service";
import {Transition} from "ui-router-core/lib";

export function resolveQuizzes(quizService: QuizService) {
  return quizService.list().first().toPromise();
}

export function resolveQuiz(quizService: QuizService, transition: Transition)  {
  return quizService.get(transition.params().quizId).first().toPromise();
}

export const states = [
  {
    name: 'admin',
    url: '/admin',
    component: AdminComponent
  },
  {
    name: 'admin.quizzes',
    url: '/quizzes',
    component: QuizzesComponent,
    resolve: [{
        token: 'quizzes',
        deps: [QuizService],
        resolveFn: resolveQuizzes
      }
    ]
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
    component: TopicComponent
  },
  {
    name: 'admin.question',
    url: '/quizzes/:quizId/topic/:topicId/question/:questionId',
    component: QuestionComponent
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forChild({ states });

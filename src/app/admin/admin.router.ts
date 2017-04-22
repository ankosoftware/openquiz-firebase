import { ModuleWithProviders } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizComponent } from './quizzes/quiz.component';
import { TopicComponent } from './topics/topic.component';
import { QuestionComponent } from './questions/question.component';
import { QuizService } from "../common/firebase/services/quiz.service";

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
        resolveFn: (quizService: QuizService) => {
          return quizService.list().first().toPromise();
        }
      }
    ]
  },
  {
    name: 'admin.quiz',
    url: '/quizzes/:quizId',
    component: QuizComponent
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

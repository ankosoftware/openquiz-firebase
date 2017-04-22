import { ModuleWithProviders } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizzesComponent } from './quizzes/quizzes.component';


export const states = [
  {
    name: 'admin',
    url: '/admin',
    component: AdminComponent
  },
  {
    name: 'admin.quizzes',
    url: '/quizzes',
    component: QuizzesComponent
  }
];

export const routing: ModuleWithProviders = UIRouterModule.forChild({ states });

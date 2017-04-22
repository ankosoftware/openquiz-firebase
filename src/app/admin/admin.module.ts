import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { router } from './admin.router';

import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizzesComponent } from './quizzes/quizzes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    router
  ],
  declarations: [
    HeaderComponent,
    AdminComponent,
    DashboardComponent,
    QuizzesComponent
  ]
})
export class AdminModule {}

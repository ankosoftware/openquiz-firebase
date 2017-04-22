import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './admin.router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizComponent } from './quizzes/quiz.component';
import { NewQuizComponent } from './quizzes/new-quiz.component';
import { NewTopicComponent } from './quizzes/new-topic.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    QuizzesComponent,
    QuizComponent,
    NewQuizComponent,
    NewTopicComponent
  ],
  entryComponents: [
    NewQuizComponent,
    NewTopicComponent
  ]
})
export class AdminModule {}

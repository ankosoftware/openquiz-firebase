import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GeneralModule } from '../common/general.module';
import { routing } from './admin.router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizzesComponent } from './quizzes/list/quizzes.component';
import { QuizComponent } from './quizzes/details/quiz.component';
import { NewQuizComponent } from './quizzes/new/new-quiz.component';
import { NewTopicComponent } from './topics/new/new-topic.component';
import { TopicComponent } from './topics/details/topic.component';
import { QuestionComponent } from './questions/question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    GeneralModule,
    routing
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    QuizzesComponent,
    QuizComponent,
    NewQuizComponent,
    NewTopicComponent,
    TopicComponent,
    QuestionComponent
  ],
  entryComponents: [
    NewQuizComponent,
    NewTopicComponent
  ]
})
export class AdminModule {}

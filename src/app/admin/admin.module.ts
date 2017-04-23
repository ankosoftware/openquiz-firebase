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
import { MarkdownModule } from 'angular2-markdown';
import {ResultsComponent} from "./results/results.component";
import {ResultDetailsComponent} from "./results/details/resultdetails.component";
import {AnalisysServices} from "./quizzes/analisys.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    GeneralModule,
    MarkdownModule.forRoot(),
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
    QuestionComponent,
    ResultsComponent,
    ResultDetailsComponent
  ],
  providers: [
    AnalisysServices
  ],
  entryComponents: [
    NewQuizComponent,
    NewTopicComponent
  ]
})
export class AdminModule {}

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { UIRouter } from "ui-router-ng2";
import { User } from "../common/model/user.model";
import { MaterialComponent } from '../common/components/material/material.component';
import {Quiz} from "../common/model/quiz.model";
import {Topic} from "../common/model/topic.model";
import {TopicService} from "../common/firebase/services/topic.service";
import {Question} from "../common/model/question.model";
import {QuestionService} from "../common/firebase/services/question.service";
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  inputs: ['user', 'quiz'],
  templateUrl: './player.component.html'
})
export class PlayerComponent extends MaterialComponent implements OnInit {
  @Input() user: User;
  @Input() quiz: Quiz;

  topics: Topic[] = [];
  questions: Question[] = [];

  state: string = 'created';
  started: Date = null;
  timeLeft: number = null;

  constructor(protected uiRouter: UIRouter,
              private topicService: TopicService,
              private questionService: QuestionService,
              private chRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    if(!this.user) {
      this.uiRouter.stateService.go('login');
    }
    this.topicService.getList(this.quiz.topics).then((topics) => {
      this.topics = topics;
      const requests = this.topics.map((topic)=>{
        return this.questionService.randomQuestions(topic.numberOfQuestions, {orderByChild:'topicId', equalTo:topic.id})
      });
      Promise.all(requests).then((_questions:any)=>{
        this.questions = this.questions.concat(_questions);
          //this.chRef.detectChanges();
      })
    });
  }

  start() {
    debugger;
    this.state = 'started';
    this.started = new Date();
    if(this.quiz.totalTimeLimit) {
      this.timeLeft = this.quiz.totalTimeLimit * 60 * 1000 - (Date.now() - this.started.getTime())
      Observable.interval(1000).subscribe(() => {
        this.timeLeft = this.quiz.totalTimeLimit * 60 * 1000 - (Date.now() - this.started.getTime())
        if(this.timeLeft<=0) {
          this.complete();
        }
      });
    }
  }
  complete() {
    this.state = 'completed';
  }
}

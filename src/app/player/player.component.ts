import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {UIRouter} from "ui-router-ng2";
import {User} from "../common/model/user.model";
import {MaterialComponent} from "../common/components/material/material.component";
import {Quiz} from "../common/model/quiz.model";
import {Topic} from "../common/model/topic.model";
import {TopicService} from "../common/firebase/services/topic.service";
import {Question} from "../common/model/question.model";
import {QuestionService} from "../common/firebase/services/question.service";
import {QuizResultService} from "../common/firebase/services/quizresult.service";
import {Observable} from "rxjs/Rx";
import {QuizResult, ResultAnswer} from "../common/model/quizresult.model";

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
  private result: QuizResult;

  constructor(protected uiRouter: UIRouter,
              private topicService: TopicService,
              private questionService: QuestionService,
              private quizResultService: QuizResultService,
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
    this.state = 'started';
    this.started = new Date();
    this.result = new QuizResult();
    this.result.start = this.started;
    this.result.quiz = this.quiz.id;
    this.result.user = this.user.email;
    this.quizResultService.create(this.result).then((res) => this.result = res);
    if(this.quiz.totalTimeLimit) {
      this.timeLeft = this.quiz.totalTimeLimit * 60 * 1000 - (Date.now() - this.started.getTime());
      Observable.interval(1000).subscribe(() => {
        this.timeLeft = this.quiz.totalTimeLimit * 60 * 1000 - (Date.now() - this.started.getTime());
        if(this.timeLeft<=0) {
          this.complete();
        }
      });
    }
  }

  answer(question: Question, entered: string[]) {
    let res = new ResultAnswer();
    res.question = question.id;
    res.entered = entered;
    this.result.answers.push(res);
    this.quizResultService.update(this.result).then(() => {
    });
  }
  complete() {
    this.state = 'completed';
  }
}

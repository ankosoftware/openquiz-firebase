import {Component, Input, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Transition} from "ui-router-core/lib";
import {QuestionService} from '../../common/firebase/services/question.service';
import {Question, QUESTION_TYPE, ANSWER_TYPE, QuestionAnswer} from '../../common/model/question.model';
import {MaterialComponent} from "../../common/components/material/material.component";
import {UIRouter} from "ui-router-ng2";
import {StorageService} from "../../common/firebase/services/storage.service";
import uuid from "uuid";

@Component({
  inputs:['question'],
  templateUrl: './question.component.html'
})
export class QuestionComponent extends MaterialComponent implements OnInit{

  @Input() question: Question;

  selectedAnswer: string;
  uploadProggress: number = 0;

  constructor(protected questionService: QuestionService, private transition: Transition, private uiRouter: UIRouter, private storageService: StorageService) {
    super();
  }

  ngOnInit(): void {
    if(!this.question) {
      this.question = new Question({topicId: this.transition.params().topicId});
    }
    else {
      switch(this.question.answerType) {
        case 'single_select':
          this.selectedAnswer = this.question.correctAnswer[0] && this.question.correctAnswer[0].id;
          break;
        case 'multi_select':
          this.question.answers.forEach((answer)=>{
            answer._correct = !!this.question.correctAnswer.find((corAnswer)=> corAnswer.id == answer.id)
          });
          break;
    }
    }
  }

  answerSelectionChanged(answer) {
    switch(this.question.answerType) {
      case 'single_select': {
        this.question.correctAnswer = [answer];
      }
      break;
      case 'multi_select': {
        this.question.correctAnswer = this.question.answers.filter((answer)=>answer._correct);
      }
    }
  }

  questionTypeChanged() {
    this.question.content = '';
  }

  addAnswer() {
    switch(this.question.answerType) {
      case 'single_select':
      case 'multi_select': {
        this.question.answers.push(new QuestionAnswer());
      }
      break;
      case 'text': {
        this.question.correctAnswer.push(new QuestionAnswer());
      }
    }
  }

  removeAnswer(answer) {
    const answIndx = this.question.answers.findIndex(item=>answer.id == item.id);
    const corAnswIndx = this.question.correctAnswer.findIndex(item=>answer.id == item.id);
    if(answIndx > -1) {
      this.question.answers.splice(answIndx, 1);
    }
    if(corAnswIndx > -1) {
      this.question.correctAnswer.splice(answIndx, 1);
    }
  }

  answerTypeChanged() {
    this.question.answers = [];
    this.question.correctAnswer = [];
    this.selectedAnswer = null;
  }

  imageChanged(file) {
    this.storageService.create(uuid.v4(), file).subscribe((event)=>{
      if(event.url) {
        this.question.content = event.url;
        this.uploadProggress = event.progress;
      }

    });
  }

  onSubmit(form: NgForm, event) {
    event.preventDefault();
    if (!form.valid) {
      return;
    }
    if(this.question.id) {
      this.questionService.update(this.question).then(() => {
        this.uiRouter.stateService.go('admin.topic', {
          quizId: this.transition.params().quizId,
          topicId: this.transition.params().topicId
        });
      });
    } else {
      this.questionService.create(this.question).then(() => {
        this.uiRouter.stateService.go('admin.topic', {
          quizId: this.transition.params().quizId,
          topicId: this.transition.params().topicId
        });
      });
    }
  }
}

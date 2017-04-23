import {Component, Input, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Transition} from "ui-router-core/lib";
import { QuestionService } from '../../common/firebase/services/question.service';
import {Question, QUESTION_TYPE, ANSWER_TYPE, QuestionAnswer} from '../../common/model/question.model';
import {MaterialComponent} from "../../common/components/material/material.component";

@Component({
  inputs:['question'],
  templateUrl: './question.component.html'
})
export class QuestionComponent extends MaterialComponent implements OnInit{

  @Input() question: Question;

  selectedAnswer: string;

  constructor(protected questionService: QuestionService, private transition: Transition) {
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
      if(this.question.answerType=='single_select') {

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

  onSubmit(form: NgForm, event) {
    event.preventDefault();
    if (!form.valid) {
      return;
    }
    this.questionService.create(this.question).then(() => {
      window.history.back();
    });
  }
}

import { Component } from '@angular/core';

const answerModel = {
  answer: '',
  isCorrectAnswer: false
};

@Component({
  templateUrl: './question.component.html'
})
export class QuestionComponent {
  question = {};
  answers = [];

  addAnswer() {
    const answerClone = Object.assign({}, answerModel);
    this.answers.push(answerClone);
  }


}

import { Component } from '@angular/core';

@Component({
  templateUrl: './question.component.html'
})
export class QuestionComponent {
  question = {
    answerType: 'multiple-choice'
  };
  answers = [];

  addAnswer() {
    this.answers.push({});
  }
}

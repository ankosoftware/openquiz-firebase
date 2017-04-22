import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from '../../common/firebase/services/question.service';
import { Question, QuestionType, QuestionAnswer } from '../../common/model/question.model';

@Component({
  templateUrl: './question.component.html'
})
export class QuestionComponent {
  question: Question | any = {
    type: QuestionType.single
  };

  answers = [];

  constructor(
    protected questionService: QuestionService
  ) {}

  onControlsChanged(index: number) {
    if (this.question.type === QuestionType.single) {
      this.answers.forEach((answer, indexInThePool: number) => {
        if (indexInThePool !== index) {
          answer.isCorrect = false;
        }
      });
    }
  }

  addAnswer() {
    this.answers.push({
      _timestamp: new Date().getTime()
    });
  }

  removeAnswer(index) {
    this.answers.splice(index, 1);
  }

  onSubmit(form: NgForm, event) {
    event.preventDefault();
    if (!form.valid) {
      return;
    }

    const { question } = this;
    const payloadData = new Question({
      name: question.name,
      type: question.type,
      description: question.description,
      answers: this.answers.map((answer) => {
        return new QuestionAnswer({
          answer: answer.answer,
          isCorrect: answer.isCorrect
        });
      })
    });

    this.questionService.create(payloadData).then((response) => {
      console.log(response);
    });
  }
}

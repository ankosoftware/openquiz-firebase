import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import {IQuiz, Quiz} from "../../../common/model/quiz.model";
import {QuizService} from "../../../common/firebase/services/quiz.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'new-quiz',
  templateUrl: './new-quiz.component.html'
})
export class NewQuizComponent extends DialogComponent<Quiz, Quiz> implements IQuiz {
  id: string;
  totalTimeLimit: number;
  passScore: number;
  name: string;
  description: string;
  topics: string[] = [];
  questions: string[] = [];
  isPublic: boolean;
  constructor(dialogService: DialogService, protected quizService: QuizService) {
    super(dialogService)
  }

  isNew() {
    return !this.id;
  }

  onSubmit(form:NgForm, event) {
    event.preventDefault();
    if(form.valid) {
      this.result = new Quiz({
        id: this.id,
        name: this.name,
        totalTimeLimit: this.totalTimeLimit,
        passScore: this.passScore,
        isPublic: this.isPublic,
        description: this.description,
        questions: this.questions,
        topics: this.topics
      });
      this.close();
    }
  }
}

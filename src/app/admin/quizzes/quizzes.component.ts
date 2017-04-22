import { Component } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { NewQuizComponent } from './new-quiz.component';

@Component({
  templateUrl: './quizzes.component.html'
})
export class QuizzesComponent {
  constructor(
    protected dialogService: DialogService
  ) {}

  newQuiz() {
    this.dialogService.addDialog(NewQuizComponent, {});
  }
}

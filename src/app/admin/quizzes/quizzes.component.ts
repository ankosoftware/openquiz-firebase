import {Component, Input, OnInit} from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { NewQuizComponent } from './new-quiz.component';
import {Quiz} from "../../common/model/quiz.model";

@Component({
  inputs: ['quizzes'],
  templateUrl: './quizzes.component.html'
})
export class QuizzesComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.quizzes)
  }

  @Input() quizzes: Quiz[] = [];
  constructor(protected dialogService: DialogService) {

  }

  newQuiz() {
    this.dialogService.addDialog(NewQuizComponent, {});
  }
}

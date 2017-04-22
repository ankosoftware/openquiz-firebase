import {Component, Input, OnInit} from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { NewQuizComponent } from './new-quiz.component';
import {Quiz} from "../../common/model/quiz.model";
import {QuizService} from "../../common/firebase/services/quiz.service";

@Component({
  inputs: ['quizzes'],
  templateUrl: './quizzes.component.html'
})
export class QuizzesComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.quizzes)
  }

  @Input() quizzes: Quiz[] = [];
  constructor(protected dialogService: DialogService, protected quizService: QuizService) {

  }

  newQuiz() {
    this.dialogService.addDialog(NewQuizComponent, {}).subscribe((quiz:Quiz)=>{
      if(quiz.id) {
        this.quizService.update(quiz).then(()=>{

        });
      }
      else {
        this.quizService.create(quiz).then(()=>{
          this.quizzes.push(quiz);
        });
      }
    });
  }
}

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { NewQuizComponent } from '../new/new-quiz.component';
import {Quiz} from "../../../common/model/quiz.model";
import {QuizService} from "../../../common/firebase/services/quiz.service";

@Component({
  inputs: ['quizzes'],
  templateUrl: './quizzes.component.html'
})
export class QuizzesComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.quizzes)
  }

  @Input() quizzes: Quiz[] = [];
  constructor(protected dialogService: DialogService, protected quizService: QuizService, private chRef: ChangeDetectorRef) {

  }

  editQuiz(quiz=new Quiz()) {

    this.dialogService.addDialog(NewQuizComponent, quiz).subscribe((quiz:Quiz)=> {
      if(quiz) {
        if (quiz.id) {
          this.quizService.update(quiz).then((res) => {
            const _quiz = this.quizzes.find(item=>item.id === quiz.id);
            Object.assign(_quiz, quiz);
          });
        }
        else {
          this.quizService.create(quiz).then((res) => {
            this.quizzes.push(res);
            this.chRef.detectChanges();
          });
        }
      }
    });
  }
}

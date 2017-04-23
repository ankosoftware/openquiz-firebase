import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import {UIRouter} from "ui-router-ng2";
import { NewQuizComponent } from '../new/new-quiz.component';
import {Quiz} from "../../../common/model/quiz.model";
import {QuizService} from "../../../common/firebase/services/quiz.service";
import {ConfirmComponent} from "../../../common/components/confirm/confirm.component";
import { MaterialComponent } from "../../../common/components/material/material.component";
import {FirebasePage} from "../../../common/firebase/services/firebasepage";

@Component({
  inputs: ['quizzes'],
  templateUrl: './quizzes.component.html'
})
export class QuizzesComponent extends MaterialComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.quizzes)
  }

  @Input() quizzes: FirebasePage<Quiz> = { data: [], length: 0};
  constructor(
    protected dialogService: DialogService,
    protected quizService: QuizService,
    private chRef: ChangeDetectorRef,
    protected uiRouter: UIRouter
  ) {
    super();
  }

  editQuiz(quiz:Quiz=new Quiz()) {

    this.dialogService.addDialog(NewQuizComponent, quiz).subscribe((quiz:Quiz)=> {
      if(quiz) {
        if (quiz.id) {
          this.quizService.update(quiz).then((res) => {
            const _quiz = this.quizzes.data.find(item=>item.id === quiz.id);
            Object.assign(_quiz, quiz);
            this.chRef.detectChanges();
          });
        }
        else {
          this.quizService.create(quiz).then((res) => {
            this.uiRouter.stateService.reload();
          });
        }
      }
    });
  }
  deleteQuiz(quiz:Quiz) {
    this.dialogService.addDialog(ConfirmComponent, {title: 'Delete Quiz', message: `Are you sure you want delete quiz "${quiz.name}"?`}).subscribe((result)=>{
      if(result) {
        this.quizService.remove(quiz.id).then(()=>{
          this.uiRouter.stateService.reload();
        })
      }
    })
  }
}

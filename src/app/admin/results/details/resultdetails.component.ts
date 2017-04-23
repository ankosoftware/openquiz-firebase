import {Component, Input, OnInit} from "@angular/core";
import {Quiz} from "../../../common/model/quiz.model";
import {QuizResult} from "../../../common/model/quizresult.model";
import {MaterialComponent} from "../../../common/components/material/material.component";
import {AnalisysServices} from "../../quizzes/analisys.service";

@Component({
  inputs: ['quiz', 'quizresult'],
  templateUrl: './resultdetails.component.html'
})
export class ResultDetailsComponent extends MaterialComponent implements OnInit {
  @Input() quiz: Quiz;
  @Input() quizresult: QuizResult;

  constructor(protected analisysServices: AnalisysServices) {
    super();
  }

  ngOnInit(): void {
    if (this.quizresult && !this.quizresult.score && this.quizresult.end) {
      this.analisysServices.processResult(this.quizresult).then(() => {
      });
    }
  }
}

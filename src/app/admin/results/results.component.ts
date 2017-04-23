import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../common/model/quiz.model";
import {QuizResult} from "../../common/model/quizresult.model";
import {MaterialComponent} from "../../common/components/material/material.component";
import {QuizResultService} from "../../common/firebase/services/quizresult.service";

@Component({
  inputs: ['quiz'],
  templateUrl: './results.component.html'
})
export class ResultsComponent extends MaterialComponent implements OnInit {
  @Input() quiz: Quiz;
  results: QuizResult[] = [];

  constructor(protected quizResultService: QuizResultService) {
    super();
  }

  ngOnInit(): void {
    this.quizResultService.list({orderByChild:'quiz', equalTo:this.quiz.id}).then((results)=>{
      this.results = results.data;
    })
  }
}

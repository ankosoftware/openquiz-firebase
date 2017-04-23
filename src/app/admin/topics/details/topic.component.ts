import {Component, Input, OnInit} from '@angular/core';
import {Transition} from "ui-router-core/lib";
import {Topic} from "../../../common/model/topic.model";
import { MaterialComponent } from "../../../common/components/material/material.component";
import {QuestionService} from "../../../common/firebase/services/question.service";
import {Question} from "../../../common/model/question.model";

@Component({
  inputs:['topic'],
  templateUrl: './topic.component.html'
})
export class TopicComponent extends MaterialComponent implements OnInit {
  @Input() topic: Topic;
  quizId: string;
  questions: Question[] = [];
  constructor(transition: Transition, private questionService: QuestionService) {
    super();
    this.quizId = transition.params().quizId;
  }
  ngOnInit(): void {
    this.questionService.list({orderByChild:'topicId', equalTo:this.topic.id}).then((questions)=>{
      this.questions = questions.data;
    })
  }
}

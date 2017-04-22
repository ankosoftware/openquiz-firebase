import {Component, Input, OnInit} from '@angular/core';
import {Transition} from "ui-router-core/lib";
import {Topic} from "../../../common/model/topic.model";

@Component({
  inputs:['topic'],
  templateUrl: './topic.component.html'
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  quizId: string;
  constructor(transition: Transition) {
    this.quizId = transition.params().quizId;
  }
  ngOnInit(): void {

  }
}

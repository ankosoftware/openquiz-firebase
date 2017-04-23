import {Component, Input, OnInit} from '@angular/core';
import {Transition} from "ui-router-core/lib";
import {Topic} from "../../../common/model/topic.model";
import { MaterialComponent } from "../../../common/components/material/material.component";

@Component({
  inputs:['topic'],
  templateUrl: './topic.component.html'
})
export class TopicComponent extends MaterialComponent implements OnInit {
  @Input() topic: Topic;
  quizId: string;
  constructor(transition: Transition) {
    super();
    this.quizId = transition.params().quizId;
  }
  ngOnInit(): void {

  }
}

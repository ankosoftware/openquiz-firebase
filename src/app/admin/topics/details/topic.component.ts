import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../../../common/model/topic.model";

@Component({
  inputs:['topic'],
  templateUrl: './topic.component.html'
})
export class TopicComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input() topic: Topic;
}

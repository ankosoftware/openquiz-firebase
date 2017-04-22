import {Component, Input} from '@angular/core';
import {Topic} from "../../../common/model/topic.model";

@Component({
  inputs:['topic'],
  templateUrl: './topic.component.html'
})
export class TopicComponent {
  @Input() topic: Topic;
}

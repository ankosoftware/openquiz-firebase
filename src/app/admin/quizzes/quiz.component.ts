import {Component, Input} from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { NewTopicComponent } from './new-topic.component';
import {Quiz} from "../../common/model/quiz.model";
import {Topic} from "../../common/model/topic.model";

@Component({
  inputs: ['quiz'],
  templateUrl: './quiz.component.html'
})
export class QuizComponent {
  @Input() quiz: Quiz;
  constructor(protected dialogService: DialogService) {

  }
  editTopic(topic: Topic = new Topic()) {
    this.dialogService.addDialog(NewTopicComponent, topic).subscribe((topic) => {

    });
  }
}

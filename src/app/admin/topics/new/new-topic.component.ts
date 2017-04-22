import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import {ITopic, Topic} from "../../../common/model/topic.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'new-topic',
  templateUrl: './new-topic.component.html'
})
export class NewTopicComponent extends DialogComponent<Topic, Topic> implements ITopic {
  id: string;
  name: string;
  description: string;
  questionTimeLimit: number;
  numberOfQuestions: number;
  pointsPerQuestion: number;
  randomizeQuestions: boolean;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  onSubmit(form:NgForm, event) {
    event.preventDefault();
    if(form.valid) {
      this.result = new Topic({
        id: this.id,
        name: this.name,
        description: this.description,
        questionTimeLimit: this.questionTimeLimit,
        numberOfQuestions: this.numberOfQuestions,
        pointsPerQuestion: this.pointsPerQuestion,
        randomizeQuestions: this.randomizeQuestions
      });
    }
    close();
  }
}

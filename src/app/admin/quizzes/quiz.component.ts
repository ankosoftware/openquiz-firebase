import { Component } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { NewTopicComponent } from './new-topic.component';

@Component({
  templateUrl: './quiz.component.html'
})
export class QuizComponent {
  constructor(
    protected dialogService: DialogService
  ) {}

  newTopic() {
    this.dialogService.addDialog(NewTopicComponent, {}).subscribe((isConfirmed) => {
    });
  }
}

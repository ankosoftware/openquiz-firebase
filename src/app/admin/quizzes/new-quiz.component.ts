import { Component } from '@angular/core';
import { DialogComponent } from 'ng2-bootstrap-modal';

@Component({
  selector: 'new-quiz',
  templateUrl: './new-quiz.component.html'
})
export class NewQuizComponent extends DialogComponent<any, any> {
  model = {};

  cancel() {
    this.close();
  }
}

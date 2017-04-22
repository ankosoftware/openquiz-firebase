import { Component } from '@angular/core';
import { DialogComponent } from 'ng2-bootstrap-modal';

@Component({
  selector: 'new-topic',
  templateUrl: './new-topic.component.html'
})
export class NewTopicComponent extends DialogComponent<any, any> {
  model = {};
}

import {Component, Input} from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { NewTopicComponent } from '../../topics/new/new-topic.component';
import {Quiz} from "../../../common/model/quiz.model";
import {Topic} from "../../../common/model/topic.model";
import {QuizService} from "../../../common/firebase/services/quiz.service";
import {TopicService} from "../../../common/firebase/services/topic.service";

@Component({
  inputs: ['quiz'],
  templateUrl: './quiz.component.html'
})
export class QuizComponent {
  @Input() quiz: Quiz;
  constructor(protected dialogService: DialogService, private quizService: QuizService, private topicService:TopicService) {

  }
  editTopic(topic: Topic = new Topic()) {
    this.dialogService.addDialog(NewTopicComponent, topic).subscribe((topic) => {
      if(topic.id) {
        this.topicService.update(topic).then(()=>{

        });
      }
      else {
        this.topicService.create(topic).then(()=>{
          if(!this.quiz.topics) {
            this.quiz.topics = [];
          }
          this.quiz.topics.push(topic.id);
        });
      }
    });
  }
}

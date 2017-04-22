import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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
export class QuizComponent implements OnInit{
  @Input() quiz: Quiz;
  topics: Topic[] = [];
  constructor(protected dialogService: DialogService, private quizService: QuizService, private topicService:TopicService, private chRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.topicService.getList(this.quiz.topics).then((topics) => {
      this.topics = topics;
    });
  }

  editTopic(topic: Topic = new Topic()) {
    this.dialogService.addDialog(NewTopicComponent, topic).subscribe((topic) => {
      if(topic) {
        if (topic.id) {
          this.topicService.update(topic).then(() => {
             const _topic = this.topics.find(item=>item.id === topic.id);
             Object.assign(_topic, topic);
          });
        }
        else {
          this.topicService.create(topic).then((topic) => {
              this.topics.push(topic);
              this.quiz.topics.push(topic.id);
              this.quizService.update(this.quiz).then((quiz) => {
                Object.assign(this.quiz, quiz);
                this.chRef.detectChanges();
              });
          });
        }
      }
    });
  }
}

import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {Quiz} from "../../model/quiz.model";
import {AngularFire} from "angularfire2";
import {UIRouter} from "ui-router-ng2";
import {Topic} from "../../model/topic.model";
import {TopicService} from "./topic.service";

@Injectable()
export class QuizService extends FirebaseService<Quiz> {

  constructor(af: AngularFire, uiRouter: UIRouter, protected ts: TopicService) {
    super(af, uiRouter, 'quiz');
  }

  toModel(json: any): Quiz {
    return new Quiz(json);
  }

  topics(quiz: Quiz): Promise<Topic[]> {
    return quiz && quiz.topics && this.ts.getList(quiz.topics)
  }
}

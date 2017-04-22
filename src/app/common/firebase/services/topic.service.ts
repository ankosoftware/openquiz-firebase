import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {AngularFire} from "angularfire2";
import {UIRouter} from "ui-router-ng2";
import {Topic} from "../../model/topic.model";

@Injectable()
export class TopicService extends FirebaseService<Topic> {

  constructor(af: AngularFire, uiRouter: UIRouter) {
    super(af, uiRouter, 'quiz');
  }

  toModel(json: any): Topic {
    return new Topic(json);
  }
}

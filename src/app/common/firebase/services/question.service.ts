import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {AngularFire} from "angularfire2";
import {Question} from "../../model/question.model";
import {UIRouter} from "ui-router-ng2";

@Injectable()
export class QuestionService extends FirebaseService<Question> {

  constructor(af: AngularFire, uiRouter: UIRouter) {
    super(af, uiRouter, 'question');
  }

  toModel(json: any): Question {
    return new Question(json);
  }
}

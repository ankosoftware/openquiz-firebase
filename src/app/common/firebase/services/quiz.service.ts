import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {Quiz} from "../../model/quiz.model";
import {AngularFire} from "angularfire2";
import {UIRouter} from "ui-router-ng2";

@Injectable()
export class QuizService extends FirebaseService<Quiz> {

  constructor(af: AngularFire, uiRouter: UIRouter) {
    super(af, uiRouter, 'quiz');
  }

  toModel(json: any): Quiz {
    return new Quiz(json);
  }
}

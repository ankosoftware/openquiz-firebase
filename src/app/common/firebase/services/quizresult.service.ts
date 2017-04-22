import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {AngularFire} from "angularfire2";
import {QuizResult} from "../../model/quizresult.model";
import {UIRouter} from "ui-router-ng2";

@Injectable()
export class QuizService extends FirebaseService<QuizResult> {

  constructor(af: AngularFire, uiRouter: UIRouter) {
    super(af, uiRouter, 'quizresult');
  }

  toModel(json: any): QuizResult {
    return new QuizResult(json);
  }
}

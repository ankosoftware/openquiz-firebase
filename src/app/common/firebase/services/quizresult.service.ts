import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {AngularFire} from "angularfire2";
import {QuizResult} from "../../model/quizresult.model";

@Injectable()
export class QuizService extends FirebaseService<QuizResult> {

  constructor(af: AngularFire) {
    super(af, 'quizresult');
  }

  toModel(json: any): QuizResult {
    return new QuizResult(json);
  }
}

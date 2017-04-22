import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {Quiz} from "../../model/Quiz";
import {AngularFire} from "angularfire2";

@Injectable()
export class QuizService extends FirebaseService<Quiz> {

  constructor(af: AngularFire) {
    super(af, 'quiz');
  }

  toModel(json: any): Quiz {
    return new Quiz(json);
  }
}

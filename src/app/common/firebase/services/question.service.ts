import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {AngularFire} from "angularfire2";
import {Question} from "../../model/question.model";

@Injectable()
export class QuestionService extends FirebaseService<Question> {

  constructor(af: AngularFire) {
    super(af, 'question');
  }

  toModel(json: any): Question {
    return new Question(json);
  }
}

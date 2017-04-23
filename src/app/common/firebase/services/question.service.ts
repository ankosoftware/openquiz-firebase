import {Injectable} from "@angular/core";
import {FirebaseService} from "./firbase.service";
import {AngularFire} from "angularfire2";
import {Question} from "../../model/question.model";
import {UIRouter} from "ui-router-ng2";
import {Query} from "angularfire2/interfaces";

@Injectable()
export class QuestionService extends FirebaseService<Question> {

  constructor(af: AngularFire, uiRouter: UIRouter) {
    super(af, uiRouter, 'question');
  }

  randomQuestions(count: number, query?: Query): Promise<Question[]> {
    return this.list(query).then(page => {
      let arr = page.data;
      if (arr.length < count || !count) {
        return arr;
      }
      let res = [];
      for (let i = 0; i < count; i++) {
        let index = Math.floor((Math.random() * arr.length));
        res.push(arr[index]);
        arr.splice(index, 1);
      }
      return res;
    });
  }

  toModel(json: any): Question {
    return new Question(json);
  }
}

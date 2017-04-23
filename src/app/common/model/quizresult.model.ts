import uuid from "uuid";
import {Base} from "./base.model";
import {IQuestionAnswer} from "./question.model";

export class ResultAnswer extends Base {
  question: string; // id
  entered: IQuestionAnswer[]; // entered answers

  constructor(json?: any) {
    super(json);
    this.id = this.id || uuid.v4();
  }

}
export class QuizResult extends Base {

  quiz: string; // id
  user: string; // email, owner email
  start: Date;
  end: Date;
  answers: ResultAnswer[];
  score: number;
  maxScore: number;

  constructor(json?: any) {
    super(json);
    this.answers = this.answers || [];
  }
}

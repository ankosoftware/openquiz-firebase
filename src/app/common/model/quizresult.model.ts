import uuid from "uuid";
import {Base} from "./base.model";
import {IQuestionAnswer, Question} from "./question.model";
import {IUser} from "./user.model";

export class ResultAnswer extends Base {
  question: string; // id
  questionDetails: Question;
  entered: IQuestionAnswer[]; // entered answers
  correct: boolean;
  score: number;

  constructor(json?: any) {
    super(json);
    this.id = this.id || uuid.v4();
  }

}
export class QuizResult extends Base {

  quiz: string; // id
  user: IUser; // owner details
  start: Date;
  end: Date;
  answers: ResultAnswer[];
  score: number;
  maxScore: number;
  passScore: number;
  pass: boolean;

  constructor(json?: any) {
    super(json);
    this.answers = this.answers || [];
  }
}

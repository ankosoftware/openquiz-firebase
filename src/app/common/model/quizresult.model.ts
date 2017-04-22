import {Base} from "./base.model";
import {Quiz} from "./quiz.model";

export class QuizResult extends Base {

  quiz: Quiz;
  user: string; // id or email
  start: Date;
  end: Date;
  answers: string[];
  score: number;
  maxScore: number;

  constructor(json?: any) {
    super(json);
  }

}

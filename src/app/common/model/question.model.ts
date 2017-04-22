import {Base} from "./base.model";

export class QuestionAnswer extends Base {
  answer: string;
  isCorrect: boolean;

  constructor(json?: any) {
    super(json);
  }
}

export enum QuestionType {
  single = 1,
  multipleChoice,
}

export class Question extends Base {
  name: string;
  type: QuestionType;
  description: string;
  answers: QuestionAnswer[];

  constructor(json?: any) {
    super(json);
  }
}

import {Base} from "./base.model";

export interface QuestionAnswer {
  answer: string;
  isCorrect: boolean;
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

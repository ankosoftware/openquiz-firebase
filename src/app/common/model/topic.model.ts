import {Base, IBase} from "./base.model";

export interface ITopic extends IBase {
  name: string;
  description?: string;
  questionTimeLimit?: number;
  numberOfQuestions?: number;
  pointsPerQuestion?: number;
  questions: string[];
}

export class Topic extends Base implements ITopic {
  name: string;
  description: string;
  questionTimeLimit: number;
  numberOfQuestions: number;
  pointsPerQuestion: number;
  questions: string[];
  constructor(json?: any) {
    super(json);
  }
}

import {Base, IBase} from "./base.model";

export interface ITopic extends IBase {
  name: string;
  description?: string;
  questionTimeLimit?: number;
  numberOfQuestions?: number;
  pointsPerQuestion?: number;
  randomizeQuestions?: boolean;
}

export class Topic extends Base implements ITopic {
  name: string;
  description: string;
  questionTimeLimit: number;
  numberOfQuestions: number;
  pointsPerQuestion: number;
  randomizeQuestions: boolean;
  constructor(json?: any) {
    super(json);
    this.pointsPerQuestion = this.pointsPerQuestion || 1;
  }
}

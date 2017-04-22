import {Base, IBase} from "./base.model";

export interface IQuiz extends IBase {
  name: string;
  description: string;
  questions: string[];
  totalTimeLimit: number;
  isPublic: boolean;
  passScore: number;
}

export class Quiz extends Base implements IQuiz{
  totalTimeLimit: number;
  passScore: number;
  isPublic: boolean;
  name: string;
  description: string;
  questions: string[];

  constructor(json?: IQuiz) {
    super(json);
  }
}

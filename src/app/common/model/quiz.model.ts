import {Base, IBase} from "./base.model";

export interface IQuiz extends IBase {
  name: string;
  description: string;
  questions: string[];
  topics: string[];
  totalTimeLimit: number;
  isPublic: boolean;
  passScore: number;
}

export class Quiz extends Base implements IQuiz{
  name: string;
  description: string;
  totalTimeLimit: number;
  passScore: number;
  isPublic: boolean;
  topics: string[];
  questions: string[];
  createdAt: Date;

  constructor(json?: IQuiz) {
    super(json);
    this.topics = this.topics || [];
    this.questions = this.questions || [];
    this.isPublic =  this.isPublic || false;
    this.createdAt = this.createdAt || new Date();
  }
}

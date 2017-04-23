import uuid from 'uuid';
import {Base, IBase} from "./base.model";

export interface IQuestionAnswer extends IBase {
  title: string;
  value: string;
  _correct?:boolean;
}

export class QuestionAnswer extends Base implements IQuestionAnswer {
  title: string;
  value: string;
  constructor(json?: any) {
    super(json);
    this.id = this.id || uuid.v4();
  }
}

export const QUESTION_TYPE = {
  IMAGE:'image',
  TEXT: 'text',
  MARKDOWN: 'md'
};

export const ANSWER_TYPE = {
  SINGLE_SELECT: 'single_select',
  MULTI_SELECT: 'multi_select',
  TEXT: 'text'
};

export class Question extends Base {
  title: string;
  questionType: string;
  content: string;
  answers: IQuestionAnswer[];
  correctAnswer: IQuestionAnswer[];
  answerType: string;
  topicId: string;
  constructor(json?: any) {
    super(json);
    this.answers = this.answers || [];
    this.correctAnswer = this.correctAnswer || [];
    this.questionType = this.questionType || QUESTION_TYPE.TEXT;
    this.answerType = this.answerType || '';
  }
}

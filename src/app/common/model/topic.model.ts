import {Base} from "./base.model";

export class Topic extends Base {

  name: string;
  // TODO: enum
  type: string;
  description: string;
  answers: string[];
  correctAnswer: string;

  constructor(json?: any) {
    super(json);
  }

}

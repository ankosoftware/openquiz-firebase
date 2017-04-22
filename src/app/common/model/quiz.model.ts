import {Base} from "./base.model";

export class Quiz extends Base {

  name?: string;
  description?: string;
  questions?: string[];

  constructor(json?: any) {
    super(json);
  }

}

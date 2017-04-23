import {Base} from "./base.model";

export class Superuser extends Base {

  // id = auth.uid
  displayName: string;
  email: string;

  constructor(json?: any) {
    super(json);
  }

}

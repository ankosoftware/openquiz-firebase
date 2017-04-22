import {Base, IBase} from "./base.model";

export interface IUser extends IBase {
  displayName: string;
  email?: string;
  photoURL?: string;
}

export class User extends Base implements IUser {
  displayName: string;
  constructor(json?: any) {
    super(json);
  }
}

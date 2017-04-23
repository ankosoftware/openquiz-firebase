import {Base, IBase} from "./base.model";

export interface IUser extends IBase {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
}

export class User extends Base implements IUser {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
  constructor(json?: any) {
    super(json);
  }
}

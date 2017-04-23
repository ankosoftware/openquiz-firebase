import {Base} from "../../model/base.model";

export interface FirebasePage<T extends Base> {
  data: T[],
  length: number
}

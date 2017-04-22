export interface IBase {
  id?: string;
}
export abstract class Base implements IBase {

  id?: string;

  constructor(json: any = {}) {
    Object.assign(this, json);
    this.id = json && json.$key;
  }

  toDB(): any {
    let obj = {};
    Object.assign(obj, this);
    for (let key in obj) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
    return obj;
  }
}

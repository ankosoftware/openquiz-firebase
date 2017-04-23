export interface IBase {
  id?: string;
}
export abstract class Base implements IBase {

  id?: string;
  owner?: string;
  isOwner = false;

  constructor(json: any = {}) {
    Object.assign(this, json);
    this.id = json && (json.$key || json.id);
  }

  toJSON(): any {
    let obj:any = {};
    Object.assign(obj, this);
    for (let key in obj) {
      if(obj.hasOwnProperty(key)) {
        if (!obj[key]) {
          delete obj[key];
        }
        if (key.startsWith('_')) {
          delete obj[key];
        }
      }
    }
    delete obj.id;
    delete obj.isOwner;
    return obj;
  }
}

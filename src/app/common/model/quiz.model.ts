export class Quiz {

  name: String;
  description: String;
  questions: Array<String>;

  constructor(json: any) {
    Object.assign(this, json);
  }
}

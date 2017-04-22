const fields = ['name'];
export class Quiz {

  constructor(json: any) {
    for (let f in fields) {
      this[f] = json && json[f];
    }
  }
}

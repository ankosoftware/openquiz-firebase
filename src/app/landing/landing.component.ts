import { Component } from '@angular/core';

@Component({
  selector: 'landing',
  template: `
    <h1>OpenQuiz</h1>
    <p>
      bla-bla
    </p>
    <p>
      <a uiSref="login">login</a>
    </p>
    <p>
      <a uiSref="makemeadmin">Make me admin</a>
    </p>
  `
})
export class LandingComponent  {

}

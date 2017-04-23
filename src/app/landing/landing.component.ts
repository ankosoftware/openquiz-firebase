import {Component, Input} from '@angular/core';
import { MaterialComponent } from "../common/components/material/material.component";
import {Quiz} from "../common/model/quiz.model";

@Component({
  inputs:['quizzes'],
  selector: 'landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent extends MaterialComponent {
  @Input() quizzes: Quiz[];
}

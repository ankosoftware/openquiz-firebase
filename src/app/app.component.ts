import { Component, OnInit } from '@angular/core';
import {AuthService} from "./common/firebase/services/auth.service";

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    $.material.init();
  }
}

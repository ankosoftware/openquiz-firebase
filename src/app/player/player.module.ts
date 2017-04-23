import {NgModule} from '@angular/core';
import {PlayerComponent} from "./player.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {GeneralModule} from "../common/general.module";
import {MarkdownModule} from "angular2-markdown";
import {routing} from "./player.router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    GeneralModule,
    MarkdownModule.forRoot(),
    routing
  ],
  declarations: [
    PlayerComponent
  ]
})
export class PlayerModule {}

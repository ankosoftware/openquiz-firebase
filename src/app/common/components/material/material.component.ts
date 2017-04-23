import { AfterViewInit } from '@angular/core';

declare const $: any;

export class MaterialComponent implements AfterViewInit {
  ngAfterViewInit() {
    $.material.init();
  }
}

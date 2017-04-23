import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[image]'
})
export class ImageDirective implements OnChanges {
  @Input() image: string;
  private prevImage: string;

  constructor(private element: ElementRef) {
  }

  ngOnChanges() {
    const el = this.element.nativeElement;

    if (el.tagName.toLowerCase() !== 'img') {
      throw new Error('directive image allowed only for img tag');
    }
    if (this.image.indexOf('base64') > -1) {
      return el.src = this.image;
    }
    if (this.prevImage === this.image) {
      return;
    }
    this.prevImage = this.image;
    el.src = 'assets/images/loader.svg';
    const image = new Image();
    image.onload = () => {
      el.src = this.image;
    };
    image.onerror = () => {
      el.src = 'assets/images/no-image.svg';
    };
    image.src = this.image;
  }
}

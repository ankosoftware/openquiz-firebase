import {Component, OnInit, Input} from '@angular/core';
import {Transition} from "ui-router-core/lib";
import {UIRouter} from "ui-router-ng2";

@Component({
  inputs: ['hasNextPage'],
  selector:'pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  skip: number;
  limit: number;
  @Input() hasNextPage: boolean;

  constructor (protected transition: Transition, protected uiRouter: UIRouter) {

  }
  ngOnInit(): void {
    this.skip = +this.transition.params().skip || 0;
    this.limit = +this.limit || 10;
  }
  previous() {
    this.skip-=this.limit;
    if(this.skip<0) {
      this.skip = 0;
    }
    this.uiRouter.stateService.go(this.uiRouter.stateService.current.name, {
      ...this.uiRouter.stateService.current.params,
      skip: this.skip,
      limit: this.limit
    })
  }
  next() {
    this.skip+=this.limit;
    if(this.skip<0) {
      this.skip = 0;
    }
    this.uiRouter.stateService.go(this.uiRouter.stateService.current.name, {
      skip: this.skip,
      limit: this.limit
    })
  }
}

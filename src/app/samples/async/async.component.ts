import { TimeService } from '../../time.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-async',
  template: `

    <p>async time: {{ time$ | async }}</p>

  `
})
export class AsyncComponent implements OnDestroy {

    time$ = this.timeService.time('AsyncPipe');

    constructor(public timeService: TimeService) {}

    ngOnDestroy() {
      console.log('AsyncComponent destroyed');
    }
}

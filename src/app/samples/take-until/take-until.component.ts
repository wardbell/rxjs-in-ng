// tslint:disable:member-ordering
import { TimeService } from '../../time.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

let counter = 0;

@Component({
    selector: 'app-take-until',
    template: ` <p>time: {{ time }}</p>`
})
export class TakeUntilComponent implements OnInit, OnDestroy {
  time: string;
  time$: Observable<string>

  // #1 - create a Notifier subject
  private onDestroy = new Subject<void>();

  // #2 Call next() on the notifier when component dies
  ngOnDestroy() {
    this.onDestroy.next();
    console.log(`TakeUntilComponent #${counter} destroyed`);
  }

  ngOnInit() {
    counter += 1;
    this.time$ = this.timeService.time$(`TakeUntilComponent #${counter}`);
    this.time$.pipe(
      // #3 Pipe notifier into `takeUntil()`
      takeUntil(this.onDestroy)
    )
    .subscribe(
        time => (this.time = time),
        err => console.error(err),
        () => console.log('TakeUntil completed')
    );
  }

  constructor(private timeService: TimeService) {}

}

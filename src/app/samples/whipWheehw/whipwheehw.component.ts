import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  SkipSelf
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable, timer } from 'rxjs';

import {
  map,
  scan,
  share,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

import { TimeService } from '../../time.service';

let counter = 0;
const log = (context: string) => (...args) =>
  console.log(++counter, context, ...args);

@Component({
  // tslint:disable:component-selector
  selector: 'whip-wheehw',
  template: `
    <form [formGroup]='operator'>
        <label>
            <input formControlName="kind" type="radio" value="none" checked>None
        </label>
        <label>
            <input formControlName="kind" type="radio" value="share">share
        </label>
        <label>
            <input formControlName="kind" type="radio" value="shareReplay">shareReplay
        </label>
    </form>

    <div *ngFor="let item of whipwheehws$ | async" class="main">
        <input type="range" [value]="item|async" min=0 [max]="STEPS-1">
    </div>
    `
})
export class WhipwheehwComponent implements OnInit {
  STEPS = 40;
  toggle = false;

  whipwheehw$ = timer(0, 2000).pipe(
    map(n => n % 2 === 0),
    // tap(log('outer')),
    switchMap(n =>
      timer(500, 1000 / this.STEPS).pipe(
        map(i => (n ? i : this.STEPS - 1 - i)),
        take(this.STEPS)
        // tap(log('inner'))
      )
    )
  );

  whipwheehws$: Observable<Observable<number>[]>;

  operator = new FormGroup({
    kind: new FormControl('none')
  });

  useWhatOperator$ = this.operator.valueChanges.pipe(
    startWith({ kind: 'none' }),
    map(o => o.kind),
    map(kind => {
      switch (kind) {
        case 'none':
          return this.whipwheehw$;
        case 'share':
          return this.whipwheehw$.pipe(share());
        case 'shareReplay':
          return this.whipwheehw$.pipe(shareReplay(1));
      }
    })
  );

  constructor() {}

  ngOnInit() {
    this.startIt();
  }

  startIt() {
    const genTen = operator =>
      timer(250, 500).pipe(
        take(10),
        switchMap(_ => [operator]),
        scan((acc, ww) => acc.concat(ww), [])
      );
    this.toggle = true;
    this.whipwheehws$ = this.useWhatOperator$.pipe(switchMap(genTen));
  }
}

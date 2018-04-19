import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, from } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TimeService } from '../../time.service';

@Component({
  selector: 'app-comp-alive-obs',
  template: `
    <p>alive OBS time: {{time }}</p>
  `
})
export class CompAliveObsComponent implements OnInit, OnDestroy {
  time: string;
  constructor(private t: TimeService) {}
  ngOnInit() {
    this.t
      .time$('CompAliveObs')
      .pipe(takeUntil(CompStillAlive(this)))
      .subscribe(
        time => (this.time = time),
        err => console.error(err),
        () => console.log('completed')
      );
  }
  ngOnDestroy(): void {
    /* must exist, even if it does nothing */
  }
}

function CompStillAlive(comp) {
  const fireOnDestroy = new Subject();
  const orgFn = comp.ngOnDestroy.bind(comp);
  comp.ngOnDestroy = () => {
    fireOnDestroy.next();
    orgFn();
  };

  return from(fireOnDestroy);
}

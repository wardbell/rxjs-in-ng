import { TimeService } from '../../time.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

import { takeUntil } from 'rxjs/operators';

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
    this.t.time('CompAliveObs')
      .pipe(
        takeUntil(CompStillAlive(this))
      )
      .subscribe(
        time => (this.time = time),
        err => console.error(err),
        () => console.log('completed')
      );
  }
  ngOnDestroy(): void { /* must exist, even if it does nothing */ }
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

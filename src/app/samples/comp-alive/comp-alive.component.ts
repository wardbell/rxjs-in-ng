import { TimeService } from '../../time.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-comp-alive',
  template: `

    <p>time: {{time }}</p>

  `
})
export class CompAliveComponent implements OnInit, OnDestroy {

  time: string;

  constructor(private t: TimeService) {}  ngOnInit() {
      this.t.time('CompAlive')
        .pipe(
          takeWhile(CompStillAlive(this))
        )
        .subscribe(
          time => (this.time = time),
          err => console.error(err),
          () => console.log('completed')
        );
  }

  ngOnDestroy() { /* must exist, even if it does nothing */ }
}

function CompStillAlive(comp) {
    let active = true;
    const originalDestroy = comp.ngOnDestroy.bind(comp);
    comp.ngOnDestroy = () => {
        active = false;
        originalDestroy();
    };

    return () => active;
}

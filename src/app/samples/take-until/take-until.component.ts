import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { TimeService } from '../../time.service';

@Component({
    selector: 'app-take-until',
    template: `

      <p>observable operator: {{time }}</p>
    `
})
export class TakeUntilComponent implements OnInit, OnDestroy {
  time: string;
  private onDestroy = new Subject<void>();

  constructor(private t: TimeService) {}

  ngOnInit() {
    this.t.time('TakeUntil')
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(
          time => (this.time = time),
          err => console.error(err),
          () => console.log('TakeUntil completed')
      );
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}

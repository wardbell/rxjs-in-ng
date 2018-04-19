import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeService } from '../../time.service';
import { Observable } from 'rxjs';

let counter = 0;

@Component({
  selector: 'app-async',
  template: `<p>async time: {{ time$ | async }}</p>`
})
export class AsyncPipeComponent implements OnInit, OnDestroy {

  time$: Observable<string>

  ngOnInit() {
    counter += 1;
    this.time$ = this.timeService.time$(`AsyncPipeComponent #${counter}`);

  }

  ngOnDestroy() {
    console.log(`AsyncPipeComponent #${counter} destroyed`);
  }

  constructor(public timeService: TimeService) {}
}

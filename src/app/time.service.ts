import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class TimeService {

  time(label = '') {
    return interval(400).pipe(
      take(30), // fail safe, stop emitting after ~12 secs

      tap(counter => {
        if (counter === 0) {
          console.log(`${label} TimeService timer started`);
        } else if (counter === 29) {
          console.log(`${label} TimeService self-completes after 12 seconds`);
        }
      }),

      map(() => new Date().toLocaleTimeString()), // return time as a string

      tap(
          time => console.log(`${label} time`, time),
          null,
          () => console.log(`${label} TimeService timer completed`),
      )
    );
  }

}

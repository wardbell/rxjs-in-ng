// tslint:disable:member-ordering
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { concat, empty, of, Observable } from 'rxjs';
import {
  catchError,
  expand,
  ignoreElements,
  map,
  merge,
  scan,
  shareReplay,
  startWith,
  tap
} from 'rxjs/operators';

import { RootPeople } from '../samples/sw-interfaces';

@Injectable()
export class SwPeopleService {

  // Get a page of people
  //   next?: any; // url of next page (if there is one)
  //   results: People;
  private load = (url: string): Observable<RootPeople> =>
    this.http
      .get<RootPeople>(url)
      .pipe(
        catchError(() => of(null)),
        tap(() => console.log('fetched from back-end: ' + url))
      );

  // load all people form the paged API
  // start off with loading the first page.
  people$ = this.load(`https://swapi.co/api/people/`).pipe(

    // expand to get additional pages
    // hint: r.next means there's another page
    expand(r => r.next ? this.load(r.next) : empty()),

    // for each page, extract the people (in results)
    map(r => r.results),

    // scan to accumulate the pages (emitted by expand)
    scan((allPeople, pageOfPeople) => allPeople.concat(pageOfPeople), []),

    // sort them
    map(list => list.sort(byName)),

    // Share the result with all subscribers
    shareReplay(1)
  );

  // Running count as people pages arrive
  count$ = this.people$.pipe(map(list => list.length), startWith(0));

  // Turn loading spinner on and off
  loading$ = concat(
    of(true),
    this.people$.pipe(ignoreElements()),
    of(false)
  );





  // find a single person in the list, by using
  // again this uses the people$ observable to get
  // and then use plain JS to find the correct one.
  find(partial) {
    return this.people$.pipe(
      map(list =>
        list.filter(
          character =>
            character.name
              .toLocaleLowerCase()
              .indexOf(partial.toLocaleLowerCase()) > -1
        )
      )
    );
  }

  constructor(private http: HttpClient) {}
}

function byName(x, y) {
  return x.name < y.name ? -1 : 1;
}

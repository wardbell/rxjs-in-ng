// tslint:disable:member-ordering
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, empty, of } from 'rxjs';
import { catchError, concat, distinctUntilChanged, expand, map, merge, scan, shareReplay, startWith, tap } from 'rxjs/operators';

import { RootPeople } from '../samples/sw-interfaces';

@Injectable()
export class SwPeopleService {
  // use http to get a singe page with people entries
  private load = (url: string): Observable<RootPeople> =>
    this.http
      .get<RootPeople>(url)
      .pipe(
        catchError(_ => of<RootPeople>(null)),
        tap(() => console.log('fetched from back-end: ' + url))
      );

  // load all people form the paged API
  // start off with loading the first page.
  private people$ = this.load(`https://swapi.co/api/people/`).pipe(
    // then use expand to insert the rest of the pages.
    expand(r => (r.next ? this.load(r.next) : empty())),
    map(r => r.results),  // We only need the results
    // use scan to take all the incomming results from above
    // and accumulate them into a single arrya, that emmits on every page
    scan((allPeople, incommingPage) => allPeople.concat(incommingPage), []),
    map(list => list.sort((x, y) => (x.name < y.name ? -1 : 1))), // Keep the list oredered
    shareReplay(1),
  );

  // an observable of boolean to indicate loading
  loading$ = of(true).pipe( // Yes, it si loading now
    // merge in the people array
    merge(this.people$.pipe(
      map(_ => true),    // yes I'm still loading
      // Concat on complete. (when ale apges are in) It will be true
      concat(of(false)))
    ),
    distinctUntilChanged() // don't toggle anymore once done.
  );

  // use the people observable to count the number of results.
  count$ = this.people$.pipe(map((list: any[]) => list.length), startWith(0));

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

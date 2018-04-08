// tslint:disable:member-ordering
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, ReplaySubject, of } from 'rxjs';
import {
  catchError,
  concat,
  distinctUntilChanged,
  map,
  merge,
  mergeMap,
  scan,
  shareReplay,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { People, RootPeople } from 'app/samples/sw-interfaces';

const log = (desc: string) => (...args) => console.log(desc, ...args);

@Injectable()
export class SwPeopleService {
  private addOne$ = new ReplaySubject<People[]>(Number.POSITIVE_INFINITY);

  private additions$ = this.addOne$.pipe(
    startWith([]),
    scan((acc, ext) => acc.concat(ext), [])
  );

  private load = (url: string): Observable<RootPeople> =>
    this.http
      .get<RootPeople>(url)
      .pipe(
        catchError(_ => of<RootPeople>(null)),
        tap(() => console.log('fetched from back-end: ' + url)),
        switchMap(r => (r.next ? of(r).pipe(merge(this.load(r.next))) : of(r)))
      );

  private _people$ = of(`https://swapi.co/api/people/`).pipe(
    mergeMap(this.load),
    map(r => r.results),
    scan((acc, cur) => acc.concat(cur), []),
    shareReplay(1)
  );

  people$ = this._people$.pipe(
    mergeMap(list =>
      this.additions$.pipe(map(additions => list.concat(additions)))
    ),
    map(list => list.sort((x, y) => (x.name < y.name ? -1 : 1)))
  );

  loading$ = of(true).pipe(
    merge(this._people$.pipe(map(_ => true), concat(of(false)))),
    distinctUntilChanged()
  );

  count$ = this.people$.pipe(map((list: any[]) => list.length), startWith(0));

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

  add(newCharacter: People) {
    // generate an id! just for demo purposes.
    newCharacter.url = new Date().getTime().toString(36);
    /**
     * Make sure you do the actual save to DB in here.
     * as this function now only updates the local
     */
    return this.addOne$.next([newCharacter]);
  }

  save(update: People) {}

  constructor(private http: HttpClient) {}
}

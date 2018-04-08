// tslint:disable:member-ordering
import { Component } from '@angular/core';
import { WikipediaService, WikiResult } from 'app/samples/wikipedia.service';
import { FormControl } from '@angular/forms';

import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-wikipedia',
  template: `
    <div>
      <div *ngIf="errorMsg" class="error">{{errorMsg}}</div>

      <!-- Bind input box to the component class's searchTerm FormControl -->
      <input type="text" [formControl]="searchTerm" />

      <ul>
          <li *ngFor="let article of articles$ | async" [title]='article.desc'>
            <span *ngIf="!article.url">{{article.title}}</span>
            <a *ngIf="article.url" [href]="article.url" target="blank">{{article.title}}</a>
          </li>
      </ul>
    </div>
  `
})
export class WikipediaComponent {

  // FormControl gives access to changes in the search box
  searchTerm = new FormControl();
  errorMsg = '';

  constructor(private wikiService: WikipediaService) {}

  // Listen for search box value changes
  articles$ = this.searchTerm.valueChanges.pipe(

    tap(() => this.errorMsg = ''), // clear previous error (if any)
    debounceTime(1000),            // wait for typing to stop
    distinctUntilChanged(),        // only if different than last time

    // Try search. Discard an in-flight search (if any).
    switchMap(searchTerm => this.wikiService.load(searchTerm)
      .pipe(
        // Catch and recover from search error here.
        // If try to recover later, `searchTerm` observable completes
        catchError(err => {
          this.errorMsg = err.message;
          return of([]); // return to happy path with empty list
        })
      )
    ),

    map(this.makeResultsPretty),

    tap(diagnostic)
  );

  makeResultsPretty(list: WikiResult[]): WikiResult[] {
    return list.length === 0 ? [{ title: 'No results' }] : list;
  }
}



/** State of the observable after each search */
const diagnostic = {
  next: () => console.log('** wikisearch alive'),
  error: () => console.error('** wikisearch dead by error'),
  completed: () => console.log('** wikisearch completed')
}

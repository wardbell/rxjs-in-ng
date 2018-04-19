// tslint:disable:member-ordering
import { Component } from '@angular/core';
import { WikipediaService, WikiResult } from '../../samples/wikipedia.service';
import { FormControl } from '@angular/forms';

import { EMPTY, Observable } from 'rxjs';
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
      <input type="text" [formControl]="searchTerm" placeholder="Search"/>

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

  // Listen for search box value changes
  searchTerms$: Observable<string> = this.searchTerm.valueChanges;

  // Turn Observable of search values into Observable of Wikipedia results
  articles$ = this.searchTerms$.pipe(

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
          return EMPTY; // return to happy path with empty list
        })
      )
    ),

    map(this.makeResultsPretty)
  );

  makeResultsPretty(list: WikiResult[]): WikiResult[] {
    return list.length === 0 ? [{ title: 'No results' }] : list;
  }

  constructor(private wikiService: WikipediaService) {}
}

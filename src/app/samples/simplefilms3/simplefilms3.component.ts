/**
 *  add operators: catchError
 *  use .pipe()
 *  AsyncPipe to display films
 */
import { Component, OnInit } from '@angular/core';
import { Movie } from 'app/samples/sw-interfaces';

import { Observable } from 'rxjs/Observable';

// Import RxJS operators
import { catchError } from 'rxjs/operators';

import { SimpleFilmsService3 } from './simple-films3.service';

@Component({
  selector: 'app-simplefilms3',
  template: `

  <h3>Simple Films 3: asyncPipe and catch</h3>

  <!-- Show films using AsyncPipe -->
  <div *ngFor="let film of films$ | async">{{film.title}}</div>

  <div *ngIf="errorMsg" class="error">{{errorMsg}}</div>

  <p><i>Refresh after adding</i></p>
  <button (click)="add()">Add movie</button>
  <button (click)="refresh()">Refresh list</button>

  `,
  providers: [ SimpleFilmsService3 ]
})
export class Simplefilms3Component implements OnInit {
  errorMsg: string;

  // Note the `$` suffix
  // Expose "Observable of Movies" instead of Movie[] with AsyncPipe
  films$: Observable<Movie[]>;

  constructor(private filmsService: SimpleFilmsService3) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.errorMsg = '';

    this.films$ = this.filmsService.getFilms().pipe(
      catchError(err => {
        this.errorMsg = err.message;
        return []; // return empty list for display
      })
    );
  }

  add() {
    const movie = { title: 'A New Observer!' } as Movie;

    // Don't forget to subscribe
    this.filmsService.add(movie).subscribe(
      null, // do nothing when succeeds
      err => {
        this.errorMsg = err.message;
      });
  }
}

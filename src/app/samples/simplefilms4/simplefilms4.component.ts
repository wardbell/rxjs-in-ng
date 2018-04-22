/**
 *  add operators: catchError
 *  use .pipe()
 *  AsyncPipe to display films
 */
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../samples/sw-interfaces';

import { Observable } from 'rxjs';

// Import RxJS operators
import { catchError } from 'rxjs/operators';

import { SimpleFilmsService4 } from './simple-films4.service';

@Component({
  selector: 'app-simplefilms4',
  template: `

  <h3>Simple Films 4: asyncPipe</h3>

  <!-- Show films using AsyncPipe -->
  <div *ngFor="let film of films$ | async">{{film.title}}</div>

  <div *ngIf="errorMsg" class="error">{{errorMsg}}</div>

  <button (click)="add()">Generate movie</button>

  `,
  providers: [ SimpleFilmsService4 ]
})
export class Simplefilms4Component implements OnInit {
  errorMsg: string;

  // Expose "OBSERVABLE of Movies" instead of Movie[] with AsyncPipe
  // Note the `$` suffix
  films$: Observable<Movie[]>;

  constructor(private filmsService: SimpleFilmsService4) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.errorMsg = '';

    // Set the OBSERVABLE<MOVIE[]>
    this.films$ = this.filmsService.getFilms().pipe(

      // CATCH the user friendly message and display it
      catchError(errorMessage => {
        this.errorMsg = errorMessage;
        return []; // return empty list for display
      })

    );
  }

  add() {
    const movie = { title: 'A New Observer!' } as Movie;

    this.filmsService.add(movie).subscribe(
      () => this.getData(),
      errorMessage => this.errorMsg = errorMessage
    );
  }
}

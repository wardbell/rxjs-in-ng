/**
 *  add operators: catchError
 */
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../samples/sw-interfaces';

import { Observable } from 'rxjs';

// Import RxJS operators
import { catchError } from 'rxjs/operators';

import { SimpleFilmsService3 } from './simple-films3.service';

@Component({
  selector: 'app-simplefilms3',
  template: `

  <h3>Simple Films 3: map and catch operators</h3>

  <div *ngFor="let film of films">{{film.title}}</div>

  <div *ngIf="errorMsg" class="error">{{errorMsg}}</div>

  <p><i>Refresh after adding</i></p>
  <button (click)="add()">Generate movie</button>
  <button (click)="refresh()">Refresh list</button>

  `,
  providers: [ SimpleFilmsService3 ]
})
export class Simplefilms3Component implements OnInit {
  errorMsg: string;
  films: Movie[];

  constructor(private filmsService: SimpleFilmsService3) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.errorMsg = '';

    this.filmsService.getFilms().subscribe(

      // Service gives us what we want ... films
      films => (this.films = films),

      // Show user-friendly message and display it
      errorMessage => {
        this.errorMsg = errorMessage;
        return []; // return empty list for display
      }
    );
  }

  add() {
    const movie = { title: 'A New Observer!' } as Movie;

    this.filmsService.add(movie).subscribe(
      () => this.refresh(),
      errorMessage => {
        this.errorMsg = errorMessage;
      });
  }
}

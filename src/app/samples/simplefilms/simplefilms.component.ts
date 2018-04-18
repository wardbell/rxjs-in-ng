import { Component, OnInit } from '@angular/core';
import { Movie } from '../../samples/sw-interfaces';
import { SimpleFilmsService } from './simple-films.service';

@Component({
  selector: 'app-simplefilms',
  template: `

  <h3>Simple Films 1: get and subscribe and errorhandling</h3>

  <div *ngFor="let film of films">{{film.title}}</div>

  <div *ngIf="errorMsg" class="error">{{errorMsg}}</div>
  `,
  providers: [SimpleFilmsService]
})
export class SimplefilmsComponent implements OnInit {
  films: Movie[];
  errorMsg: string;

  constructor(private filmsService: SimpleFilmsService) {}

  ngOnInit() {
    const films$ = this.filmsService.getFilms();

    films$.subscribe(
      data => (this.films = data.results),

      // Report errors in this 2nd subscribe parameter
      // err => {
      //   this.errorMsg = err.message;
      // }
    );
  }
}

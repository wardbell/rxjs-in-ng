import { Component, OnInit } from '@angular/core';
import { Movie } from '../../samples/sw-interfaces';
import { SimpleFilmsService2 } from './simple-films2.service';

@Component({
  selector: 'app-simplefilms2',
  template: `

  <h3>Simple Films 2: add</h3>

  <div *ngFor="let film of films">{{film.title}}</div>

  <div *ngIf="errorMsg" class="error">{{errorMsg}}</div>

  <button (click)="add()">Generate movie</button>
  `,

  providers: [ SimpleFilmsService2 ]
})
export class Simplefilms2Component implements OnInit {
  errorMsg: string;
  films: Movie[];

  constructor(private filmsService: SimpleFilmsService2) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.filmsService.getFilms().subscribe(

      data => (this.films = data.results),

      // Report errors in this 2nd subscribe parameter
      // err => {
      //   this.errorMsg = err.message;
      // }
    );
  }

  add() {
    const movie = { title: 'A New Observer!' } as Movie;

    this.filmsService.add(movie);

    this.getData();
  }
}

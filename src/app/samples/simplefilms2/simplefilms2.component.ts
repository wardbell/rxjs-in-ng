import { Component, OnInit } from '@angular/core';
import { Movie } from 'app/samples/sw-interfaces';
import { SimpleFilmsService2 } from './simple-films2.service';

@Component({
  selector: 'app-simplefilms2',
  template: `

  <h3>Simple Films 2: error and add</h3>

  <div *ngFor="let film of films">{{film.title}}</div>

  <div *ngIf="errorMsg" class="error">{{errorMsg}}</div>

  <button (click)="add()">Add movie</button>
  <button (click)="refresh()">Refresh list</button>
  `,

  providers: [ SimpleFilmsService2 ]
})
export class Simplefilms2Component implements OnInit {
  errorMsg: string;

  films: Movie[];

  constructor(private filmsService: SimpleFilmsService2) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.errorMsg = '';

    this.filmsService.getFilms().subscribe(

      // Why digging in for the results? Yuck!
      data => (this.films = data.results),

      // Report errors in this 2nd subscribe parameter
      err => {
        console.error(err);
        this.errorMsg = err.message;
      }
    );
  }

  add() {
    const movie = { title: 'A New Observer!' } as Movie;

    // Don't forget to subscribe!
    this.filmsService.add(movie); // .subscribe();
  }
}

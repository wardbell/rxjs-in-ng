import { Component, OnInit } from '@angular/core';
import { Movie } from 'app/samples/sw-interfaces';
import { SimpleFilmsService } from './simple-films.service';

@Component({
  selector: 'app-simplefilms',
  template: `

  <h3>Simple Films 1: get and subscribe</h3>

  <div *ngFor="let film of films">{{film.title}}<div>
  `,
  providers: [ SimpleFilmsService ]
})
export class SimplefilmsComponent implements OnInit {
  films: Movie[];

  constructor(private filmsService: SimpleFilmsService) {}

  ngOnInit() {
    this.filmsService.getFilms()
      .subscribe(
        data => (this.films = data.results)
      );
  }
}

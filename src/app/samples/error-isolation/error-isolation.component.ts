// tslint:disable:member-ordering
import { Component } from '@angular/core';
import { Movie, RootMovies, RootObject } from '../sw-interfaces';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  concat,
  concatMap,
  tap,
  catchError,
  filter
} from 'rxjs/operators';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { SwUrlService } from '../sw-url.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-error-isolation',
  template: `
    <h3>Error Isolation</h3>
    <input [formControl]="input" placeholder="Enter film id">

    <p>Without error isolation:</p>
        {{filmsNoErrorIsolation$|async}}

    <p>With error isolation:</p>
       {{filmsWithErrorIsolation$|async}}
  `,
  styles: [ 'p {font-weight: bold}']
})
export class ErrorIsolationComponent {
  films: Movie[];

  input = new FormControl('');

  filmIds$ = this.input.valueChanges.pipe(
    debounceTime(200) // wait for user to stop typing
  );

  getMovie$ = id => this.http.get<RootObject<Movie>>(`http://swapi.co/api/swFilms/${id}`);

  filmsNoErrorIsolation$ = this.filmIds$.pipe(
    // pipe user's film ids to get movies
    concatMap(this.getMovie$),
    map(result => result.results.title),   // extract title
    catchError(e => of(`Movie not found`)) // show error
  );



  filmsWithErrorIsolation$ = this.filmIds$.pipe(
    // pipe user's film ids to get movies
    concatMap(id => this.getMovie$(id)
        // PIPE AGAIN off of get getMovie$
        .pipe(
            map(result => result.results.title),   // extract title
            catchError(e => of(`Movie not found`)) // show error
        )
    )
  );

  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

}

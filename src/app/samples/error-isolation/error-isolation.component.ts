// tslint:disable:member-ordering
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';

import { Movie, RootObject } from '../sw-interfaces';
import { SwUrlService } from '../sw-url.service';

@Component({
  selector: 'app-error-isolation',
  template: `
    <h3>Error Isolation</h3>
    <input [formControl]="input" placeholder="Enter film id">

    <h4>Without error isolation:</h4>
        {{filmsNoErrorIsolation$ | async}}

    <h4>With error isolation:</h4>
       {{filmsWithErrorIsolation$ | async}}`
})
export class ErrorIsolationComponent {
  input = new FormControl('');

  filmIds$ = this.input.valueChanges.pipe(
    debounceTime(200) // wait for user to stop typing
  );

  getMovie$ = id => this.http.get<RootObject<Movie>>(`http://swapi.co/api/swFilms/${id}`);

  // The wrong way
  filmsNoErrorIsolation$ = this.filmIds$.pipe(
    // pipe user's film ids to get movies
    switchMap(this.getMovie$),
    map(result => result.results.title),   // extract title
    catchError(e => of(`Movie not found`)) // show error
  );

  // The right way
  filmsWithErrorIsolation$ = this.filmIds$.pipe(
    // pipe user's film ids to get movies
    switchMap(id => this.getMovie$(id)
        // PIPE AGAIN off of getMovie$
        .pipe(
            map(result => result.results.title),   // extract title
            catchError(e => of(`Movie not found`)) // show error
        )
    )
  );

  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}
}

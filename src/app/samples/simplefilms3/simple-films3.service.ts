// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootMovies, Movie } from '../sw-interfaces';
import { SwUrlService } from '../../samples/sw-url.service';

import { Observable } from 'rxjs';

// As of v5.5: import symbols from operators
import { catchError, map } from 'rxjs/operators';

// Before v5.5: Add the map operator to Observable
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

@Injectable()
export class SimpleFilmsService3 {

  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

  getFilms() {
    return this.http.get<RootMovies>(this.url)
      .pipe(

        // RxJS operators
        map((data: RootMovies) => data.results),

        catchError(err => {
          // log HTTP error and ...
          console.error('GET failed', err);
          // rethrow as a user-friendly message
          throw new Error('Sorry but can\'t get movies right now; please try again later');
        })
    );
  }

  add(movie: Movie) {
    return this.http.post(this.url, movie).pipe(
      catchError(err => {
        // log HTTP error and ...
        console.error('GET failed', err);
        // rethrow as a user-friendly message
        throw new Error('Sorry but can\'t add movies right now; please try again later')
      })
    );
  }

  private get url() {
    return this.swUrlService.url;
  }
}

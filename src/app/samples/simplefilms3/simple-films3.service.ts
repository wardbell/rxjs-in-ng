// tslint:disable:member-ordering
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';

import { SwUrlService } from '../../samples/sw-url.service';
import { Movie, RootMovies } from '../sw-interfaces';
import { Observable, throwError } from 'rxjs';



@Injectable()
export class SimpleFilmsService3 {

  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

  getFilms(): Observable<Movie[]> {
    return this.http.get<RootMovies>(this.url)
      .pipe(

        // RxJS operators
        catchError(err => {
          // log HTTP error and ...
          console.error('GET failed', err);
          // rethrow as a user-friendly message
          const message = 'Sorry, we can\'t get movies right now; please try again later'
          return throwError(message);
        }),

        // extract the Movies from the API's data object
        map((data: RootMovies) => data.results),
    );
  }

  add(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.url, movie).pipe(
      catchError(err => {
        // log HTTP error and ...
        console.error('GET failed', err);
        // rethrow as a user-friendly message
        const message = 'Sorry, we can\'t add movies right now; please try again later';
        return throwError(message);
      })
    );
  }

  private get url() {
    return this.swUrlService.url;
  }
}

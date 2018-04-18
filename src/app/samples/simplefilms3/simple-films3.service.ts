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
        return throwError('Sorry but can\'t add movies right now; please try again later')
      })
    );
  }

  private get url() {
    return this.swUrlService.url;
  }
}

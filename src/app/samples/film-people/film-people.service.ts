// tslint:disable:member-ordering
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RootMovies, RootPeople } from '../sw-interfaces';
import { SwUrlService } from '../sw-url.service';



@Injectable()
export class FilmPeopleService {
  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

  getFilmsByName(title: string) {
    return this.http.get<RootMovies>(this.movieUrl + `/?title=${title}`).pipe(
      // RxJS operators
      map((data: RootMovies) => data.results),

      catchError(err => {
        // log HTTP error and ...
        console.error('GET movies failed', err);
        // rethrow as a user-friendly message
        throw new Error(
          `Sorry but can\'t get movies right now; please try again later`
        );
      })
    );
  }

  getSwPeopleByUrl(url: string) {
    const id = url ? +url.match(/\/([0-9]*)\/$/)[1] : NaN;
    if (isNaN(id)) {
      return of([]);
    }
    return this.http.get<RootPeople>(`api/swPeople/${id}`).pipe(
      // RxJS operators
      map((data: RootPeople) => data.results),

      catchError(err => {
        // log HTTP error and ...
        console.error('GET movies failed', err);
        // rethrow as a user-friendly message
        throw new Error(
          'Sorry but can\'t get movies right now; please try again later'
        );
      })
    );
  }
  private get movieUrl() {
    return this.swUrlService.url;
  }
}

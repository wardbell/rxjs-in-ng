// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, RootObject } from './../sw-interfaces';
import { SwUrlService } from 'app/samples/sw-url.service';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class FilmService {
    constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

    getFilm(id: number) {
      return this.http.get<RootObject<Movie>>(`${this.url}/${id}`)
        .pipe(
          map(data => data.results),
          catchError(err => {
            if (err.status === 404) {
              return of<Movie>(null); // OK if not found.
            }

            // log HTTP error and ...
            console.error('GET failed', err)
            // rethrow as a user-friendly message
            throw new Error('Sorry but can\'t get movies right now; please try ain  later');
          })
        );
    }

    private get url() {
        return this.swUrlService.url;
    }
}

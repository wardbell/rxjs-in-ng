import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs/observable/of';

import { catchError, map } from 'rxjs/operators';

const wikiUrl =
    'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*';

@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient) {}

  load(search: string) {
    if (search.length < 2) {
      return of([]);
    }

    const searchUrl = `${wikiUrl}&search=${search}`;

    return this.http.get(searchUrl).pipe(

        catchError(e => {
          console.error(e);
          // just send off an empty result in case of error.
          return of([]);
        }),

        map(result =>
          result[1].reduce( (acc, title, index) =>
            acc.concat({
                title,
                desc: result[2][index],
                url: result[3][index]
            }), [] )
        )
      )
  }
}

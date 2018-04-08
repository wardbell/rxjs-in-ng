import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, retryWhen } from 'rxjs/operators';

import { createRetryWhenNotifier } from './retry-when-notifier';

export interface WikiResult {
  title: string;
  desc?: string;
  url?: string;
}

const wikiUrl =
  'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*';

@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient) {}

  load(search: string): Observable<WikiResult[]> {
    if (search.length < 2) {
      return of([]);
    }

    const searchUrl = `${wikiUrl}&search=${search}`;
    const retryNotifier = createRetryWhenNotifier(
      'WikipediaService',
      searchUrl
    );

    return this.http.get(searchUrl).pipe(
      // Progressive retry of a non-404 error
      // Experiment: open dev tools network tab and check "Offline"
      retryWhen(retryNotifier),

      // Catch the error that gets by retryWhen
      catchError(e => {
        console.error(e);
        // "user-friendly error"
        throw new Error('Server error; please contact support');
      }),

      map(result =>
        result[1].reduce(
          (acc: WikiResult[], title, index) =>
            acc.concat({
              title,
              desc: result[2][index],
              url: result[3][index]
            }),
          []
        )
      )
    );
  }
}

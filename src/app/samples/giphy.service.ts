import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, merge, tap, delay } from 'rxjs/operators';

import { RootObject } from './giphy';

const API_KEY = 'sEl7UmhvaI69Mrw9h8Ug0xNTnuhCkJpT';
const WAITIMG = 'https://media0.giphy.com/media/xTkcEQACH24SMPxIQg/100.webp';

@Injectable()
export class GiphyService {
  cache = new Map<string, string>();

  constructor(private http: HttpClient) {}

  find(key) {
    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    }

    this.cache.set(key, WAITIMG);
    return of(WAITIMG).pipe(
      merge(
        this.http
          .get<RootObject>(
            // tslint:disable-next-line:max-line-length
            `https://api.giphy.com/v1/gifs/search?api_key=sEl7UmhvaI69Mrw9h8Ug0xNTnuhCkJpT&q=${key}&limit=1&offset=0&rating=G&lang=en`
          )
          .pipe(
            delay(500),
            map(r => r.data[0].images.fixed_height_small.url),
            catchError(e => {
              console.log(key);
              return of('/assets/404.jpg');
            }),
            tap(imgsrc => this.cache.set(key, imgsrc))
          )
          .toPromise() //  make eager!
      )
    );
  }
}

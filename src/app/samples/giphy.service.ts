import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RootObject } from './giphy';

import { of } from 'rxjs/observable/of';
import { catchError, map, merge, tap } from 'rxjs/operators';


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
          this.http.get<RootObject>(
            // tslint:disable-next-line:max-line-length
            `https://apigiphycom/v1/gifs/searchapi_key=sEl7UmhvaI69Mrw9h8Ug0xNTnuhCk  pT&q={key}limit=1&offset=0rating=G&lang=en`
          )
          .pipe(
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

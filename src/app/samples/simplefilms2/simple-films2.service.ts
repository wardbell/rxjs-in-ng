import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SwUrlService } from '../../samples/sw-url.service';
import { Movie, RootMovies } from '../sw-interfaces';

@Injectable()
export class SimpleFilmsService2 {

  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

  getFilms(): Observable<RootMovies> {
    return this.http.get<RootMovies>(this.url);
  }


  add(movie: Movie): Observable<{}> {
    return this.http.post(this.url, movie);
  }


  /**
   * internal
   */
  get url() {
    return this.swUrlService.url;
  }
}

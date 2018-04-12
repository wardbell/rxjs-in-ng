import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { RootMovies } from '../sw-interfaces';
import { SwUrlService } from '../../samples/sw-url.service';

@Injectable()
export class SimpleFilmsService {
  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

  getFilms(): Observable<RootMovies> {
    return this.http.get<RootMovies>(this.url);
  }

  get url() {
    return this.swUrlService.url;
  }
}

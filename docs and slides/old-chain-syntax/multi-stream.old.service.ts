// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/shareReplay';
import { SwUrlService } from 'src/app/samples/sw-url.service';
import { RootMovies, Movie } from 'src/app/samples/sw-interfaces';

@Injectable()
export class MultiStreamService {
  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

  // 1. Movies from the StarWars API
  private cloudMovies = this.http
    .get<RootMovies>(this.url)
    .map(rm => rm.results)
    .do(movies => console.log('Hit Endpoint', movies))
    .shareReplay(1); // get only once

  // 2. Movies held in local browser storage
  // Local storage returns array synchronously;
  // we turn it into an Observable of Movie[]
  private localStorageMovies = Observable.create(observer => {
    if (localStorage) {
      const serializedMovies = localStorage.getItem('swFilms');
      const movies = JSON.parse(serializedMovies);
      observer.next(movies || []);
    }
    observer.complete();
  }) as Observable<Movie[]>;

  // 3. Movies we add during this user session
  private newMovies = new Subject<Movie[]>();

  // MERGE the THREE movie sources
  // into immutable array of immutable objects
  films$ = this.cloudMovies
    .merge(this.localStorageMovies, this.newMovies)
    // Create a new result array when any source emits a film array.
    .scan((movies, newMovies) => movies.concat(newMovies))

    // Sort the combined film array
    .map(films => films.sort((x, y) => (x.release_date < y.release_date ? -1 : 1)));

  add(newMovie: Movie) {
    // make sure we have a "proper" formated date
    newMovie.release_date = new Date(newMovie.release_date).toISOString();
    this.saveNewMovie(newMovie);

    // Push the update into the film$ observable
    this.newMovies.next([newMovie]);
  }

  /**
   * update localStorage to save my added movie
   * in a non-demo program, you will put some logic here
   * that saves your data to persistent storage
   */
  private saveNewMovie(newMovie: Movie) {
    this.localStorageMovies.subscribe(list => {
      if (localStorage) {
        list = list || [];
        localStorage.setItem('swFilms', JSON.stringify(list.concat(newMovie)));
      }
    });
  }

  private get url() {
    return this.swUrlService.url;
  }
}

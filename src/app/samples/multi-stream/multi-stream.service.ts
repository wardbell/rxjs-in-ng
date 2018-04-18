// tslint:disable:member-ordering
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, combineLatest } from 'rxjs';
import { map, scan, startWith, tap } from 'rxjs/operators';

import { Movie, RootMovies } from '../sw-interfaces';
import { SwUrlService } from '../sw-url.service';

/**
 *  Merging three streams
 */

@Injectable()
export class MultiStreamService {
  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

  // 1. Movies from the StarWars API
  private cloudMovies = this.http
    .get<RootMovies>(this.url)
    .pipe(
      map(rm => rm.results),
      tap(movies => console.log('Hit Endpoint', movies))
    );

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
  private newMoviesSubject = new Subject<Movie[]>();
  private newMovies$ = this.newMoviesSubject.pipe(
    startWith([]),
    // Create a new result array when any source emits a film array.
    scan<Movie[]>((movies, newMovies) => movies.concat(newMovies)),
  );

  // MERGE the THREE movie sources
  // into immutable array of immutable objects
  films$ = combineLatest(
    this.cloudMovies,
    this.localStorageMovies,
    this.newMovies$
  ).pipe(
    // cobine all 3 sources in a single array
    map(([cloud, local, newMovies]) => [...cloud, ...local, ...newMovies]),
    // Sort the combined film array
    map(films =>
      films.sort((x, y) => (x.release_date < y.release_date ? -1 : 1))
    )
  );

  add(newMovie: Movie) {
    // make sure we have a "proper" formated date
    newMovie = formatReleaseDate(newMovie);
    this.saveNewMovie(newMovie);

    // Push the update into the film$ observable
    this.newMoviesSubject.next([newMovie]);
  }

  clearLocalStorage() {
    if (localStorage) {
      localStorage.removeItem('swFilms');
    }
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

/// helpers ///

function formatReleaseDate(movie: Movie) {
  // Have to bump the year by 1 to get property date
  const releaseYear = (+movie.release_date).toString();
  movie.release_date = new Date(releaseYear).toISOString();
  return movie;
}

import { Component, OnInit } from '@angular/core';
import { Movie, RootMovies, RootObject } from '../sw-interfaces';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  concat,
  concatMap,
  tap,
  catchError,
  filter
} from 'rxjs/operators';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { SwUrlService } from '../sw-url.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-simplefilm-error',
  templateUrl: './simplefilm-error.component.html',
  styles: []
})
export class SimplefilmErrorComponent implements OnInit {
  films: Movie[];

  input = new FormControl('');

  update$ = this.input.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map((key: string) => +key),
    filter(n => n > 0)
  );

  filmsNoIsolation$ = this.update$.pipe(
    concatMap<number, RootObject<Movie>>(id =>
      this.http.get<RootObject<Movie>>(`http://swapi.co/api/swFilms/${id}`)
    ),
    map(result => result.results.title),
    catchError(e => of(`Movie not found`))
  );

  filmsIsolation$ = this.update$.pipe(
    concatMap<number, RootObject<Movie>>(id =>
      this.http
        .get<RootObject<Movie>>(`http://swapi.co/api/swFilms/${id}`)
        .pipe(
          map(result => result.results.title),
          catchError(e => of(`Movie not found`))
        )
    )
  );

  constructor(private http: HttpClient, private swUrlService: SwUrlService) {}

  ngOnInit() {
    // const films$ = this.filmsService.getFilms();
    console.log(this.swUrlService.url);

    // this.films$.subscribe(); //(data => (this.films = data.results));
  }
}

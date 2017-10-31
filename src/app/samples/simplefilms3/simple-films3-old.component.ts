import { Component, OnInit } from '@angular/core';
import { Movie } from 'app/samples/sw-interfaces';

import { Observable } from 'rxjs/Observable';

// Add each RxJS operator to Observable
import 'rxjs/add/operator/catch'; // now `catchError`

import { SimpleFilmsService3 } from './simple-films3.service';

// @Component({
//     selector: 'app-simplefilms3',
//     templateUrl: './simplefilms3.component.html',
//     providers: [ SimpleFilmsService3 ]
// })
export class Simplefilms3Component implements OnInit {
  errorMsg: string;

  // Note the `$` suffix
  // Expose "Observable of Movies" instead of Movie[] with AsyncPipe
  films$: Observable<Movie[]>;

  constructor(private filmsService: SimpleFilmsService3) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.errorMsg = '';

    this.films$ = this.filmsService.getFilms()
      .catch(err => {
          this.errorMsg = err.message;
          return [];
      });
  }

  add() {
    const movie = { title: 'A New Observer!' } as Movie;

    // Don't forget to subscribe
    this.filmsService.add(movie).subscribe();
  }
}

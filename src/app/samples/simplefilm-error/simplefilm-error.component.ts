import { Component, OnInit } from '@angular/core';
import { Movie } from '../sw-interfaces';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-simplefilm-error',
  templateUrl: './simplefilm-error.component.html',
  styles: []
})
export class SimplefilmErrorComponent implements OnInit {

  films: Movie[];

  input = new FormControl('')

  update$ = this.input.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map((key: string) => key.toLocaleLowerCase())
  )

  constructor() {}

  ngOnInit() {
    // const films$ = this.filmsService.getFilms();

    films$.subscribe(
      data => (this.films = data.results)
    );
  }
}

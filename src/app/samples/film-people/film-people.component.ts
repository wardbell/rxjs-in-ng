/**
 *
 */
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FilmPeopleService } from './film-people.service';




@Component({
  selector: 'app-film-people',
  templateUrl: './film-people.component.html',
  providers: [ FilmPeopleService ]
})
export class FilmPeopleComponent {
  errorMsg: string;

  // Gives access to changes in the search box
  searchTerm = new FormControl();

  // Listen for search box value changes
  films$ = this.searchTerm.valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(searchTerm => this.filmPeopleService.getFilmsByName(searchTerm)),
    map(this.makeResultsPretty)
  );

  makeResultsPretty(list) {
    return list.length === 0 ? [{ title: '(no results)' }] : list;
  }

  constructor(private filmPeopleService: FilmPeopleService) {}

}

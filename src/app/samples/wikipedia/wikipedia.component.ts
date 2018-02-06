// tslint:disable:member-ordering
import { Component } from '@angular/core';
import { WikipediaService } from 'app/samples/wikipedia.service';
import { FormControl } from '@angular/forms';

import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-wikipedia',
  templateUrl: './wikipedia.component.html'
})
export class WikipediaComponent {

  constructor(private wikiService: WikipediaService) {}

  // Gives access to changes in the search box
  searchTerm = new FormControl();

  // Listen for search box value changes
  articles$ = this.searchTerm.valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(searchTerm => this.wikiService.load(searchTerm)),
    map(this.makeResultsPretty)
  );

  makeResultsPretty(list) {
    return list.length === 0 ? [{ title: '(no results)' }] : list;
  }
}

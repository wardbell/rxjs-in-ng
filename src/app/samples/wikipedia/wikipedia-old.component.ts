// tslint:disable:member-ordering
import { Component } from '@angular/core';
import { WikipediaService } from 'app/samples/wikipedia.service';
import { FormControl } from '@angular/forms';

// Add operators to Observable prototype
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-wikipedia-old',
  templateUrl: './wikipedia.component.html'
})
export class WikipediaOldComponent {

  constructor(private wikiService: WikipediaService) {}

  // Gives access to changes in the search box
  searchTerm = new FormControl();

  // Listen for search box value changes
  keyWords$ = this.searchTerm.valueChanges
    .debounceTime(1000)
    .distinctUntilChanged()
    .switchMap(searchTerm => this.wikiService.load(searchTerm))
    .map(this.makeResultsPretty);

  makeResultsPretty(list) {
    return list.length === 0 ? [{ title: '(no results)' }] : list;
  }
}

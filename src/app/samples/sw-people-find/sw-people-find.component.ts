import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { GiphyService } from 'app/samples/giphy.service';
import { People } from 'app/samples/sw-interfaces';
import { SwPeopleService } from 'app/samples/sw-people.service';

@Component({
    selector: 'app-sw-people-find',
    templateUrl: './sw-people-find.component.html'
})
export class SwPeopleFindComponent {

  // control for the search input box
  search = new FormControl();

  // when value in the search input box changes ...
  found$ = this.search.valueChanges.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    tap(v => console.log(v)),
    switchMap(searchValue => this.sw.find(searchValue))
  )

  constructor(public sw: SwPeopleService, public gip: GiphyService) {}

}

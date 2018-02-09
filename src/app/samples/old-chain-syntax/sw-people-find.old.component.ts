import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do'; // now `tap`
import 'rxjs/add/operator/switchMap';

import { GiphyService } from 'app/samples/giphy.service';
import { People } from 'app/samples/sw-interfaces';
import { SwPeopleService } from 'app/samples/sw-people.service';

// @Component({
//     selector: 'app-sw-people-find',
//     templateUrl: './sw-people-find.component.html'
// })
export class SwPeopleFindComponent implements OnInit {
    search = new FormControl();

    found$ = this.search.valueChanges
        .debounceTime(250)
        .distinctUntilChanged()
        .do(v => console.log(v))
        .switchMap(searchValue => this.sw.find(searchValue));

    constructor(public sw: SwPeopleService, public gip: GiphyService) {}

    ngOnInit() {}
}

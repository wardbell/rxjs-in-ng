import { Component, OnInit } from '@angular/core';
import { RakiService } from 'app/rijks/raki.service';
import { FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
})
export class ArtistsComponent implements OnInit {
    search = new FormControl();

    list$ = this.search.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(artist => this.raki.artist(artist)),
        take(5)
    );

    constructor(public raki: RakiService) {}

    ngOnInit() {}
}

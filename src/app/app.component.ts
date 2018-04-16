import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {} from '';
import { RakiService } from './rijks/raki.service';
import { SwUrlService } from './samples/sw-url.service';
import { timer, fromEvent, Subject, empty, of } from 'rxjs';
import { map, tap, filter, startWith, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hasArt = false;
  numberOfBackgrounds = 16;
  movingBg$ = new Subject().pipe(startWith(true));

  backgroundArr = randommizeArrayOrder(
    Array.from(
      { length: this.numberOfBackgrounds },
      (e, i) => `Url(/assets/mainbg${i + 1}.jpg`
    )
  );

  key$ = fromEvent(this.document, 'keyup').pipe(
    filter((ev: KeyboardEvent) => ['F2', 'F4'].includes(ev.key)),
    tap(ev => ev.preventDefault()), // side effect take away original meaning of key   map((ev: KeyboardEvent) => ev.key),
    map(ev => ev.key),
    tap(k => console.log('key', k))
  );

  @ViewChild('main') main;

  constructor(
    public raki: RakiService,
    private swUrlService: SwUrlService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    if (this.hasArt) {
      const m = this.main.nativeElement;
      this.raki.randomImage$.subscribe(url => {
        m.style.backgroundImage = url;
      });
    }

    this.movingBg$.pipe(
      switchMap((go) => go ?  timer(1000, 10000) : of(10)))
      .pipe(
        map(n => +n % this.numberOfBackgrounds + 1),
        tap(
          next =>
          (this.document.body.style.backgroundImage = this.backgroundArr[
            next
          ])
        )
      )
      // I use a subscribe here, Because I don't have access to the bodly element from my template.
      // so there is no way to do <body [style.backgroundImage]="backgroundArr[next]|async"
      .subscribe();
  }

  toggleSwUrl() {
    this.swUrlService.toggleUrl();
  }
}
//

function randommizeArrayOrder(seed: any[]) {
  const org = [...seed];
  const retour = [];
  while (org.length) {
    const pickOne = Math.floor(Math.random() * org.length);
    retour.push(org.splice(pickOne, 1));
  }
  return retour;
}

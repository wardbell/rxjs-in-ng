import { Component, OnInit, ViewChild } from '@angular/core';
import {} from '';
import { RakiService } from './rijks/raki.service';
import { SwUrlService } from './samples/sw-url.service';
import { timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hasArt = false;
  numberOfBackgrounds = 14
  @ViewChild('main') main;
  constructor(public raki: RakiService, private swUrlService: SwUrlService) {}

  ngOnInit() {
    if (this.hasArt) {
      const m = this.main.nativeElement;
      this.raki.randomImage$.subscribe(url => {
        m.style.backgroundImage = url;
      });
    } else {
      timer(1000, 2000)
      .pipe(
        map(n => (+n % this.numberOfBackgrounds) + 1),
        map(n => `url(/assets/mainbg${n}.jpg)`),
        tap(url => console.log(url)),
        tap(url => document.body.style.backgroundImage = url),
      )
      .subscribe();

      // document.body.style.backgroundImage = 'url(/assets/mainbg.jpg)'
    }
  }

  toggleSwUrl() {
    this.swUrlService.toggleUrl();
  }
}
//

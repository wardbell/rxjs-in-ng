import { Component, OnInit, ViewChild } from '@angular/core';
import { RakiService } from 'app/rijks/raki.service';
import {} from '';
import { SwUrlService } from 'app/samples/sw-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hasArt = true;
  @ViewChild('main') main;
  constructor(public raki: RakiService, private swUrlService: SwUrlService) {}

  ngOnInit() {
    if (this.hasArt) {
      const m = this.main.nativeElement;
      this.raki.randomImage$.subscribe(url => {
        m.style.backgroundImage = url;
      });
    }
  }

  toggleSwUrl() {
    this.swUrlService.toggleUrl();
  }
}
//

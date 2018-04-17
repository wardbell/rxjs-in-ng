import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'se-neon',
  template: `<div class='holder' *ngIf='isShowing' (click)='isShowing=false'><h1><ng-content></ng-content></h1><div>`,
  styleUrls: ['se-neon.component.css']
})
export class SeNeonComponent implements OnInit {
  isShowing = true;

  constructor() { }

  ngOnInit() {
  }

}

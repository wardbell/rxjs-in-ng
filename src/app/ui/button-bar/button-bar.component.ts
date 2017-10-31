import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ButtonbarService, Button } from './buttonbar.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'button-bar',
    template: `
    <div class="buttonbar">
        <button *ngFor="let b of bbs.buttons$|async" (click)="bbs.activate(b,$event)">{{b.title}}</button>
        <ng-content></ng-content>
    </div>
    `
})
// tslint:disable-next-line:component-class-suffix
export class ButtonBar implements OnInit {
    constructor(public bbs: ButtonbarService) {}
    ngOnInit() {}
}

import { Component } from '@angular/core';
import { SwPeopleService } from 'app/samples/sw-people.service';

@Component({
    selector: 'app-sw-people',
    templateUrl: './sw-people.component.html',
    styles: []
})
export class SwPeopleComponent {
    constructor(public sw: SwPeopleService) {}
}

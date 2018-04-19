import { Component } from '@angular/core';
import { SwPeopleExpandService } from './sw-people-expand.service';

@Component({
  selector: 'app-sw-people',
  templateUrl: './sw-people.component.html',
  providers: [ SwPeopleExpandService ]
})
export class SwPeopleComponent {
  constructor(public sw: SwPeopleExpandService) {}
}

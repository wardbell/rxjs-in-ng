import { Component } from '@angular/core';
import { PeopleWithHomePlanetService } from './people-with-home-planet.service';

@Component({
  selector: 'app-people-w-planet',
  templateUrl: './people-with-home-planet.component.html',
  providers: [PeopleWithHomePlanetService]
})
export class PeopleWithHomePlanetComponent {
  constructor(public service: PeopleWithHomePlanetService) {}
}

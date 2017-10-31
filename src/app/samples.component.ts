import { Component } from '@angular/core';
import { RakiService } from 'app/rijks/raki.service';

@Component({
  templateUrl: './samples.component.html',
  styleUrls: [ './samples.component.css']
})
export class SamplesComponent {
    constructor(public raki: RakiService) {}
}

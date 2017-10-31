import { Component, OnInit } from '@angular/core';
import { TimeService } from 'app/time.service';

@Component({
    selector: 'app-leaky-component',
    template: `<p>time: {{time}}</p>`
})
export class LeakyComponent implements OnInit {
    static id = 1;

    time: string;

    constructor(private t: TimeService) {}

    ngOnInit() {
        this.t.time('Leak #' + LeakyComponent.id++)
          .subscribe(time => (this.time = time));
    }
}

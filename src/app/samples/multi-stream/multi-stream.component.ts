/**
 * Merging threes streams.
 * See multi-stream.service.ts
 */
// tslint:disable:member-ordering
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { MultiStreamService } from './multi-stream.service';

@Component({
    selector: 'app-multi-stream',
    templateUrl: './multi-stream.component.html',
    providers: [ MultiStreamService ],

    // Take advantage of immutability
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStreamComponent {

    constructor(private multiStreamService: MultiStreamService) {}

    films$ = this.multiStreamService.films$;

    add(newData) {
        this.multiStreamService.add(newData);
    }

    clear() {
        this.multiStreamService.clearLocalStorage();
    }

}

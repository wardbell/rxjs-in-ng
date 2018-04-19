/**
 * Merging threes streams.
 * See multi-stream.service.ts
 */
// tslint:disable:member-ordering
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { MultiStreamService } from './multi-stream.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multi-stream',
  templateUrl: './multi-stream.component.html',
  providers: [ MultiStreamService ],

  // Take advantage of immutability
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiStreamComponent {

  form = new FormGroup({
    title: new FormControl(),
    year: new FormControl()
  })

  constructor(private multiStreamService: MultiStreamService) {}

  films$ = this.multiStreamService.films$;

  add() {
    this.multiStreamService.add(this.form.value);
  }

  clear() {
    this.multiStreamService.clearLocalStorage();
  }

}

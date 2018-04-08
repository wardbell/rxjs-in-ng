import { TimeService } from '../../time.service';
import { Component, OnInit, OnDestroy, ComponentRef } from '@angular/core';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rx-operator',
  template: `<p>observable operator: {{time }}</p>`
})
export class RxOperatorComponent implements OnInit, OnDestroy {
  time: string;

  constructor(private t: TimeService) {}

  ngOnInit() {
    // debugger;
    // use this form to allow my monkey-patched rx-operator.
    (<any>this.t.time)
      .takeWhileAlive(this)
      .subscribe(time => (this.time = time), err => console.error(err), () => console.log('completed'));
  }

  ngOnDestroy(): void {
    // console.log('make sure to clean up after yourself.');
  }
}

// monkey-patch my operator into Observable. the array notation is to
// circumvent TS 'errors'
Observable.prototype['takeWhileAlive'] = function takeWhileAlive(component) {
  if (component.ngOnDestroy === undefined) {
    throw new Error('takeWhileAlive needs a ngOnDestroy method on the component');
  }
  console.log(component);
  console.log(Object.getPrototypeOf(component));

  // keep the original destroy function around.
  const orgFn = component.ngOnDestroy.bind(component);

  return Observable.create(subscriber => {
    const source = this;

    const subscription = source.subscribe(
      // just forward whatever comes in!
      value => subscriber.next(value),
      // be sure to handle errors and completions as appropriate and
      // send them along
      err => subscriber.error(err),
      () => subscriber.complete()
    );

    // monkey-patch the component's onDestroy so it completes the observable.
    component.ngOnDestroy = () => {
      subscriber.complete(); // complete the subscription
      orgFn(); // make sure the original destroy function is called
    };
    // component.onDestroy(subscriber.complete);

    // to return now
    return subscription;
  });
};

// region imports
import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';

// Convenient ... but don't do it.
// import { Observable } from 'rxjs';

// Kitchen sink ... don't do it this way either.
// import * as rxjs from 'rxjs';


// Get each thing you need separately from its module
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter } from 'rxjs/operators';

// endregion

@Component({
  selector: 'app-raw',
  templateUrl: './raw.component.html'
})
export class RawComponent implements OnInit, OnDestroy {

//////// v1 ///////////

  v1() {
    this.currentDemo = 'Observable v1';
    this.reset();

    /////// Observable
    const observable = new Observable(

      // A function that takes an Observer/Subscriber
      (observer: Observer<string>) => {

        // Call observer/subscriber methods when something happens
        observer.next('Hello, good looking!');
      }
    );

    ////// Subscriber ////////
    const subscriber: Observer<string> = {

      next: value => this.items.push(value),

      error: (err: string) => this.errorMessage = err,

      complete: () => this.items.push('observable completed')

    };

    ////// Subscribe to execute
    // Nothing happens until we subscribe!
    this.subscription = observable.subscribe(subscriber);


    ////// Alternative: Subscribe with callbacks
    // this.subscription = observable.subscribe(
    //   value => this.items.push(value),
    //   (err: string) => this.errorMessage = err,
    //   () => this.items.push('observable completed')
    // );
  }

  //////// Unsubscribe /////

  ngOnDestroy() {
    // Ultra-safe practice to unsubscribe when component destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

//////// v2 ///////////

  v2() {
    this.currentDemo = 'Observable v2';
    this.reset();

    /////// Observable
    const observable = new Observable(observer => {
        // Synchronous emits
        observer.next('wait');
        observer.next('for');
        observer.next('it');
        observer.next('...');

        // observer.error('oh no!');

        // Async - wait 2 seconds
        setTimeout(() => {
          observer.next('TA DA!'); // delayed emit
          observer.complete();
        }, 2000);
      }
    )

    this.subscription = observable.subscribe(
      value => this.items.push(value),
      (err: string) => this.errorMessage = err,
      () => this.items.push('observable completed')
    );
  }

//////// v 3 ///////////

  v3() {
    this.currentDemo = 'Observable v3';
    this.reset();
    this.isHidden = false;

    /////// Observable
    const observable = fromEvent(this.inputEl, 'keyup')

    // .pipe(
    //    // Piped operators: remember to import them!
    //    filter((k: KeyboardEvent) => k.key === 'Enter')
    // );

    this.subscription = observable.subscribe(
      value => this.items.push(this.inputEl.value),
      (err: string) => this.errorMessage = err,
      () => this.items.push('observable completed')
    );

  }

//////// Component internals ///////////
  // region component internals

  // tslint:disable:member-ordering
  isBinding = true;
  isHidden = true;
  subscription: Subscription;

  @ViewChild('input')
  inputElRef: ElementRef;
  private inputEl: HTMLInputElement;

  currentDemo = '';
  errorMessage: string;
  items: any[] = [];

  binding() {
    this.currentDemo = 'Angular Binding';
    this.reset();
    this.isBinding = true;
    this.isHidden = false;
  }

  clear() {
    this.items.length = 0;
  }

  onKey(value: string) {
    if (this.isBinding) {
      this.items.push(value);
    }
  }

  ngOnInit() {
    this.inputEl = this.inputElRef.nativeElement;
  }

  reset() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.errorMessage = '';
    this.inputEl.value = '';
    this.isBinding = false;
    this.isHidden = true;
    this.items.length = 0;
  }

  // endregion
}

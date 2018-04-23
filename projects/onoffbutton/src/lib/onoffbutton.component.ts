// tslint:disable:member-ordering
import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'on-off-button',
  template: `
	<button #button><ng-content></ng-content></button> F
  `,
  styles: [
    `

button {
  border:1px solid;
  color: white;
  padding: 10px 15px;
  width: 100px;
  border-radius: 5px;
  background-color: gray;
}
  `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnOffButtonComponent),
      multi: true
    }
  ]
})
export class OnOffButtonComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  private _val = false;
  onChange = x => x;
  onTouched = x => x;
  disabled = false;
  @Input()
  set checked(newVal: any) {
    // tslint:disable-next-line:triple-equals
    this._val = newVal != 'false';
    this.update();
  }
  get checked() { return this._val; }

  @ViewChild('button') buttonRef;
  private button: HTMLButtonElement;

  @HostListener('click')
  onclick() {
    this.update(!this._val);
  }

  constructor() {
    this.update = this.update.bind(this);
    this.update();
  }

  writeValue(val: any) {
    this._val = val;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    // this.toggleState[isDisabled ? 'disable' : 'enable']();
  }

  ngOnInit() {}

  update(newVal = this._val) {
    this.onChange(newVal);
    if (this.button) {
      this.button.style.backgroundColor = newVal ? 'blue' : 'gray';
    }
  }

  ngAfterViewInit() {
    this.button = this.buttonRef.nativeElement;
    // this.toggleState.valueChanges.subscribe(this.update);
    setTimeout(this.update, 0);
  }
}

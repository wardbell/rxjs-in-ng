// tslint:disable:member-ordering
import {
  Component,
  OnInit,
  forwardRef,
  AfterViewInit,
  Input,
  ViewChild
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl
} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'on-off-button',
  template: `
	<input type="checkbox" [formControl]="toggleState">
	<button #button><ng-content></ng-content></button> F
  `,
  styles: [
    `
  :host input {
    /* First, we make it as wide as the container */
    position: absolute;
    width: 100%;
    height: 100%;
    /* Then, we put it on top of everything else */
    z-index: 100;
    /* Last, we make it invisible */
    opacity: 0;
    /* This one is just for ergonomy */
    cursor: pointer;
}

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
  private _val;
  onChange = x => x;
  onTouched = x => x;
  disabled = false;
  @Input()
  set checked(newVal) {
    this.toggleState.setValue(newVal != 'false');
    this.update();
  }

  @ViewChild('button') buttonRef;
  private button: HTMLButtonElement;
  toggleState = new FormControl({ value: false, disabled: this.disabled });

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
    this.toggleState[isDisabled ? 'disable' : 'enable']();
  }

  ngOnInit() {}

  update(newVal = this.toggleState.value) {
    this.onChange(newVal ? this._val : undefined);
    if (this.button) {
      this.button.style.backgroundColor = newVal ? 'blue' : 'gray';
    }
  }

  ngAfterViewInit() {
    this.button = this.buttonRef.nativeElement;
    this.toggleState.valueChanges.subscribe(this.update);
    setTimeout(this.update, 0);
  }
}

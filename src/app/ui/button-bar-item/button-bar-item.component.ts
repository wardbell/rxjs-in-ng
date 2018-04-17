import {
  Component,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ButtonbarService } from '../../ui/button-bar/buttonbar.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button-bar-item',
  template: `<div class="tile">
    <ng-content></ng-content>
    </div>`,
  styles: []
})
export class ButtonBarItemComponent {
  constructor() {}
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[menuText]'
})
export class ButtonBarItemDirective implements OnInit, OnDestroy {
  @Input('menuText') menuText = '';
  showContent = false;
  onDestroy = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    public bbs: ButtonbarService
  ) {
    // console.log(this);
  }

  ngOnInit() {
    this.bbs
      .addButton({ title: this.menuText })
      .pipe(takeUntil(this.onDestroy))
      .subscribe(_ => {
        this.showContent = !this.showContent;
        if (this.showContent) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}

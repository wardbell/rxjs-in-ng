import { NgModule } from '@angular/core';
import { OnOffButtonComponent } from './onoffbutton.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OnOffDirective } from './onoffbutton.directive';

@NgModule({
  imports: [
    ReactiveFormsModule
  ],
  declarations: [OnOffButtonComponent, OnOffDirective],
  exports: [OnOffButtonComponent]
})
export class OnoffbuttonModule {}

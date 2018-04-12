import { NgModule } from '@angular/core';
import { OnOffButtonComponent } from './onoffbutton.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule
  ],
  declarations: [OnOffButtonComponent],
  exports: [OnOffButtonComponent]
})
export class OnoffbuttonModule {}

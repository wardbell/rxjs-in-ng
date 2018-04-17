import { NgModule } from '@angular/core';
import { SeNeonComponent } from './se-neon.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SeNeonComponent],
  exports: [SeNeonComponent]
})
export class SeNeonModule { }

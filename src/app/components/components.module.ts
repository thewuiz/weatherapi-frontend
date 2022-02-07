import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLoadingComponent } from './spinner-loading/spinner-loading.component';

@NgModule({
  declarations: [SpinnerLoadingComponent],
  exports: [SpinnerLoadingComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}

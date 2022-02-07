import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WeatherComponent } from './weather/weather.component';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [PagesComponent, WeatherComponent],
  exports: [WeatherComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class PagesModule {}

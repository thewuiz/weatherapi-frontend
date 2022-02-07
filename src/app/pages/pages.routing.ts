import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path: 'weather-api',
    component: PagesComponent,

    children: [
      { path: '', component: WeatherComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

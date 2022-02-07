import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  constructor(private apiServiceService: ApiServiceService) {}

  private subscription: Subscription = new Subscription();
  public consolidated_weather: any[] = [];
  private woeid: string = '';
  public today_weather: any;
  public temperature: string = 'C°';
  public ubication: string = '';

  ngOnInit(): void {
    this.getLocationSearch('17.669832,-97.568366');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // =================================================================================================
  // =============================== GET LOCATION SEARCH =============================================
  getLocationSearch(lattlong: string) {
    this.subscription.add(
      this.apiServiceService.getLocationSearch(lattlong).subscribe({
        next: (response) => {
          this.woeid = response[0].woeid;
          this.getWeatherByWoeid(this.woeid);
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  // =================================================================================================
  // =============================== GET WEATHER BY WOEID ============================================
  getWeatherByWoeid(woeid: string) {
    this.subscription.add(
      this.apiServiceService.getWeatherByWoeid(woeid).subscribe({
        next: (response) => {
          this.ubication = response.title;
          this.consolidated_weather = response.consolidated_weather;
          this.today_weather = this.consolidated_weather[0];
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  // =================================================================================================
  // =============================== GET % OF Humidity ============================================
  getHumidity(value: string): string {
    return value + '%';
  }

  // =================================================================================================
  // =============================== GET % OF Humidity ============================================
  convertDegrees(degre: string) {
    if (degre === 'c' && this.temperature !== 'C°') {
      this.temperature = 'C°';
      this.consolidated_weather = this.consolidated_weather.map((weather) => {
        weather.min_temp = ((weather.min_temp - 32) / 1.8).toFixed();
        weather.max_temp = ((weather.max_temp - 32) / 1.8).toFixed();
        weather.the_temp = ((weather.the_temp - 32) / 1.8).toFixed();
        return weather;
      });
      return (this.today_weather = this.consolidated_weather[0]);
    }
    if (degre === 'f' && this.temperature !== 'F°') {
      this.temperature = 'F°';
      this.consolidated_weather = this.consolidated_weather.map((weather) => {
        weather.min_temp = (weather.min_temp * 1.8 + 32).toFixed();
        weather.max_temp = (weather.max_temp * 1.8 + 32).toFixed();
        weather.the_temp = (weather.the_temp * 1.8 + 32).toFixed();
        return weather;
      });
      return (this.today_weather.the_temp =
        this.consolidated_weather[0].the_temp);
    }
    return;
  }
}

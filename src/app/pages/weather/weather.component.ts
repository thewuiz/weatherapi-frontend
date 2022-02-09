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
  private woeid: string = '';
  public consolidated_weather: any[] = [];
  public today_weather: any;
  public temperature: string = 'C°';
  public coordinates: string = '17.669918,-97.568430';
  public ubication: string = '';
  public searchCity: string = '';
  public resulSearch: any[] = [];

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // =================================================================================================
  // =============================== GET LOCATION SEARCH =============================================
  getLocationByCoordinates(lattlong: string = '', query: string = '') {
    this.subscription.add(
      this.apiServiceService.getLocationSearch(lattlong, query).subscribe({
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
  // =============================== GET LOCATION SEARCH =============================================
  getCitysWoeid(query: string = '') {
    this.resulSearch = [];
    this.searchCity = '';
    this.subscription.add(
      this.apiServiceService.getLocationSearch('', query).subscribe({
        next: (response) => {
          this.resulSearch = response;
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
    this.consolidated_weather = [];
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
  // =============================== GET MY CURRENT LOCATION ============================================
  getCurrentLocation() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.coordinates = `${position.coords.latitude},${position.coords.longitude}`;
          return this.getLocationByCoordinates(this.coordinates);
        },
        (err) => {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        },
        options
      );
    } else {
      return this.getLocationByCoordinates(this.coordinates);
    }
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

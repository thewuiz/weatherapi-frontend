import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private urlEndPoint = environment.base_url;
  constructor(private http: HttpClient) {}

  // =================================================================================================
  // =============================== GET LOCATION SEARCH =============================================
  getLocationSearch(
    lattlong: string = '',
    query: string = ''
  ): Observable<any[]> {
    let http_params = new HttpParams();
    if (query) {
      http_params = http_params.set('query', query);
    } else {
      http_params = http_params.set('lattlong', lattlong);
    }

    return this.http.get<any[]>(`${this.urlEndPoint}/location/search/`, {
      params: http_params,
    });
  }

  // =================================================================================================
  // =============================== GET WEATHER SEARCH =============================================
  getWeatherByWoeid(woeid: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/location/${woeid}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CountryState } from './model/country-state';
import { Observable } from 'rxjs';
import { ProcessedDate } from './model/processed-date';

const localUrl = 'https://api.information-hub.shimunmatic.de/';//"http://localhost:8090/"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<HttpResponse<CountryState[]>> {
    return this.http.get<CountryState[]>(
      localUrl + "api/countrystate/all", { observe: 'response' });
  }

  getAllForProcessedDate(processedDateId: number): Observable<HttpResponse<CountryState[]>> {
    return this.http.get<CountryState[]>(
      localUrl + "api/countrystate/all/" + processedDateId, { observe: 'response' });
  }

  getAllForCountry(countryName: string): Observable<HttpResponse<CountryState[]>> {
    return this.http.get<CountryState[]>(
      localUrl + "api/countrystate/country/" + countryName, { observe: 'response' });
  }

  getAllForCountryAndPorcessedDate(countryName: string, processedDateId: number): Observable<HttpResponse<CountryState[]>> {
    return this.http.get<CountryState[]>(
      localUrl + "api/countrystate/country/" + countryName + "/" + processedDateId, { observe: 'response' });
  }

  getAllProcessedDates(): Observable<HttpResponse<ProcessedDate[]>> {
    return this.http.get<ProcessedDate[]>(
      localUrl + "api/processeddate/all/", { observe: 'response' });
  }

  getAllCountryNames(): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(
      localUrl + "api/countrystate/country", { observe: 'response' });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CountryState } from './model/country-state';
import { ProcessedDate } from './model/processed-date';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/all`);
  }

  getAllForProcessedDate(processedDateId: number): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/all/${processedDateId}`);
  }

  getAllForWorld(): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/world`);
  }

  getAllForWorldForProcessedDate(processedDateId: number): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/world/${processedDateId}`);
  }

  getAllForCountry(countryName: string): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/country/${countryName}`);
  }

  getAllForCountryAndPorcessedDate(countryName: string, processedDateId: number): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/country/${countryName}/${processedDateId}`);
  }

  getAllProcessedDates(): Observable<ProcessedDate[]> {
    return this.http.get<ProcessedDate[]>(`${this.url}/api/processeddate/all/`);
  }

  getAllCountryNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/api/countrystate/country`);
  }
}

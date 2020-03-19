import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CountryState } from '../model/country-state';
import { ProcessedDate } from '../model/processed-date';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = environment.apiUrl;

  dates: ProcessedDate[] = [];

  constructor(private http: HttpClient) {
    this.getAllProcessedDates().subscribe(dates => this.dates = dates);
  }

  getAll(): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/all`);
  }

  getAllForPlace(place: string) {
    if (place.toUpperCase() === 'WORLD') {
      console.log('here');
      return this.getAllForWorld();
    } else {
      return this.getAllForCountry(place);
    }
  }

  getAllForPlaceOnDate(place: string, dateId: number) {
    if (place.toUpperCase() === 'WORLD') {
      return this.getAllForWorldForProcessedDate(dateId);
    } else {
      return this.getAllForCountryAndPorcessedDate(place, dateId);
    }
  }

  privategetAllForProcessedDate(processedDateId: number): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/all/${processedDateId}`);
  }

  private getAllForWorld(): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/world`);
  }

  private getAllForWorldForProcessedDate(processedDateId: number): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/world/${processedDateId}`);
  }

  private getAllForCountry(countryName: string): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/country/${countryName}`);
  }

  private getAllForCountryAndPorcessedDate(countryName: string, processedDateId: number): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(`${this.url}/api/countrystate/country/${countryName}/${processedDateId}`);
  }

  getAllProcessedDates(): Observable<ProcessedDate[]> {
    return this.http.get<ProcessedDate[]>(`${this.url}/api/processeddate/all`);
  }

  getAllCountryNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/api/countrystate/country`).pipe(map(countries => countries.sort()));
  }
}

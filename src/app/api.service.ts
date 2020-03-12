import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CountryState } from './model/country-state';
import { Observable } from 'rxjs';

const localUrl = 'http://localhost:8090/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<HttpResponse<CountryState[]>> {
    return this.http.get<CountryState[]>(
      localUrl + "api/countrystate/all", { observe: 'response' });
  }
}

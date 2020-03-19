import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _countries = [];
  private _countries$ = new BehaviorSubject(this._countries);

  private defaultCountries = ['World', 'Germany', 'Croatia']

  private localStorageKey = 'country';

  constructor() {
    this.loadSavedCountries();
  }

  private loadSavedCountries() {
    const countries = localStorage.getItem(this.localStorageKey);
    if (countries) {
      const parsed = JSON.parse(countries);
      this._countries = parsed;
    }
    this.notify();
  }

  getDefaultCountries(): string[] {
    return this.defaultCountries;
  }

  getCountries() {
    return [...this.defaultCountries, ...this._countries];
  }

  getSavedCountries$(): Observable<string[]> {
    return this._countries$.asObservable();
  }

  getSavedCountries(): string[] {
    return this._countries;
  }

  addCountries(countries: string[]) {
    countries.forEach(country => {
      if (!this._countries.includes(country)) {
        this._countries.push(country);
      }
    });
    this.saveToLocalStorage();
    this.notify();
  }

  removeCountries(countries: string[]) {
    countries.forEach(country => {
      const index = this._countries.indexOf(country);
      if (index > -1) {
        this._countries.splice(index, 1);
      }
    });
    this.notify();
  }

  clearCountries() {
    this._countries = [];
    localStorage.removeItem(this.localStorageKey);
    this.notify();
  }

  private notify() {
    this._countries$.next(this._countries);
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this._countries));
  }

}
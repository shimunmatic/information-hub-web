import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export const LIGHT_THEME_CLASS = 'light-theme';
export const DARK_THEME_CLASS = 'dark-theme';
export type THEME_TYPE = 'light-theme' | 'dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private localStorageThemeKey = 'theme';

  private _onChange$ = new BehaviorSubject<THEME_TYPE>(undefined);

  constructor() {
    this.loadTheme();
  }

  onChange(): Observable<THEME_TYPE> {
    return this._onChange$.asObservable();
  }

  setLightTheme() {
    this.removeThemes();
    this.getBodyClassList().add(LIGHT_THEME_CLASS);
    localStorage.setItem(this.localStorageThemeKey, LIGHT_THEME_CLASS);
    this._onChange$.next(LIGHT_THEME_CLASS);
  }

  setDarkTheme() {
    this.removeThemes();
    this.getBodyClassList().add(DARK_THEME_CLASS);
    localStorage.setItem(this.localStorageThemeKey, DARK_THEME_CLASS);
    this._onChange$.next(DARK_THEME_CLASS);
  }

  private removeDarkTheme() {
    this.getBodyClassList().remove(DARK_THEME_CLASS);
  }

  private removeLightTheme() {
    this.getBodyClassList().remove(LIGHT_THEME_CLASS);
  }

  private removeThemes() {
    this.removeDarkTheme();
    this.removeLightTheme()
  }

  private isLightTheme() {
    return this.getBodyClassList().contains(LIGHT_THEME_CLASS);
  }

  private isDarktheme() {
    return this.getBodyClassList().contains(DARK_THEME_CLASS);
  }

  private getBodyClassList(): DOMTokenList {
    return document.body.classList;
  }

  private loadTheme() {
    const theme = localStorage.getItem(this.localStorageThemeKey);
    if (theme) {
      if (theme === DARK_THEME_CLASS) {
        this.setDarkTheme();
      } else if (theme === LIGHT_THEME_CLASS) {
        this.setLightTheme();
      } else {
        this.setLightTheme();
      }
    } else {
      this.setLightTheme();
    }
  }

}
import { Injectable } from '@angular/core';

export const LIGHT_THEME_CLASS = 'light-theme';
export const DARK_THEME_CLASS = 'dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.setLightTheme();
  }

  setLightTheme() {
    this.removeThemes();
    this.getBodyClassList().add(LIGHT_THEME_CLASS);
  }

  setDarkTheme() {
    this.removeThemes();
    this.getBodyClassList().add(DARK_THEME_CLASS);
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

}
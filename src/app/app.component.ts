import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { ApiService, StorageService } from 'services';
import { environment } from '../environments/environment';
import { AddCountryComponent } from './add-country/add-country.component';

@Component({
  selector: 'corona-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /* Swagger api link */
  restUrl = `${environment.apiUrl}/swagger-ui.html`;

  /* Selected country name */
  country: string;

  /* Saved user countries */
  savedCountries$ = this.storage.getSavedCountries$();
  defaultCountries = this.storage.getDefaultCountries();

  screenWidth: number;

  constructor(private api: ApiService, private dialog: MatDialog, private storage: StorageService) {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  select(country: string) {
    this.country = country;
  }

  addCountries() {
    this.dialog.open(AddCountryComponent).afterClosed()
      .pipe(filter(countries => !!countries))
      .subscribe(countries => {
        this.storage.addCountries(countries);
      });
  }

  deleteCountry(event: Event, country: string) {
    event.preventDefault();
    event.stopPropagation();
    this.storage.removeCountries([country]);
  }

  deleteAllCountries() {
    this.storage.clearCountries();
  }

}

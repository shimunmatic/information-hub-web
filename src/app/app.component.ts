import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { ApiService, StorageService } from 'services';
import { environment } from '../environments/environment';
import { AddCountryComponent } from './add-country/add-country.component';

@Component({
  selector: 'corona-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /* Swagger api link */
  restUrl = `${environment.apiUrl}/swagger-ui.html`;

  /* Selected country name */
  country: string;

  /* Saved user countries */
  savedCountries$ = this.storage.getSavedCountries$();
  defaultCountries = this.storage.getDefaultCountries();

  constructor(private api: ApiService, private dialog: MatDialog, private storage: StorageService) { }

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

  // ngOnInit() {
  //   this.getCountryNames();
  // }

  // getCountryNames() {
  //   this.api.getAllCountryNames()
  //     .subscribe(resp => {
  //       this.countries = resp;
  //       this.countries.sort();
  //     })
  // }

  // convertToChartModel(countryStates: CountryState[]): ChartModel[] {
  //   const data: ChartModel[] = [];

  //   const confirmedCases: ChartModel = {
  //     name: 'Confirmed',
  //     series: []
  //   };
  //   const deathCases: ChartModel = {
  //     name: 'Deaths',
  //     series: []
  //   };
  //   const recoveredCases: ChartModel = {
  //     name: 'Recovered',
  //     series: []
  //   };

  //   countryStates.forEach(state => {
  //     const confirmedEntry: ChartEntry = {
  //       name: new Date(state.processedDate.processedDate),
  //       value: state.confirmedCases
  //     };
  //     const deathsEntry: ChartEntry = {
  //       name: new Date(state.processedDate.processedDate),
  //       value: state.deathCases
  //     };
  //     const recoveredEntry: ChartEntry = {
  //       name: new Date(state.processedDate.processedDate),
  //       value: state.recoveredCases
  //     };
  //     confirmedCases.series.push(confirmedEntry);
  //     deathCases.series.push(deathsEntry);
  //     recoveredCases.series.push(recoveredEntry);
  //   });

  //   data.push(confirmedCases, deathCases, recoveredCases);
  //   return data;
  // }

  // removeChartClicked(countryName: string) {
  //   this.customStatesData = this.customStatesData.filter(function (obj) {
  //     return obj.name != countryName;
  //   })
  // }

  // addChartCountry() {
  //   if (this.selectedCountry && this.selectedCountry != "") {
  //     this.customStatesData.push({
  //       name: this.selectedCountry,
  //       data: this.api.getAllForCountry(this.selectedCountry).pipe(map(data => this.convertToChartModel(data)))
  //     });
  //   }
  // }

}

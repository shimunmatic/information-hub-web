import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ChartModel, ChartEntry } from './model/chart-model';
import { CountryState } from './model/country-state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  worldData = {
    name: 'World',
    data: this.api.getAllForWorld().pipe(map(data => this.convertToChartModel(data)))
  };
  customStatesData = ['Germany', 'Croatia'].map(name => {
    return {
      name,
      data: this.api.getAllForCountry(name).pipe(map(data => this.convertToChartModel(data)))
    };
  });

  constructor(private api: ApiService) { }

  convertToChartModel(countryStates: CountryState[]): ChartModel[] {
    const data: ChartModel[] = [];

    const confirmedCases: ChartModel = {
      name: 'Confirmed',
      series: []
    };
    const deathCases: ChartModel = {
      name: 'Deaths',
      series: []
    };
    const recoveredCases: ChartModel = {
      name: 'Recovered',
      series: []
    };

    countryStates.forEach(state => {
      const confirmedEntry: ChartEntry = {
        name: new Date(state.processedDate.processedDate),
        value: state.confirmedCases
      };
      const deathsEntry: ChartEntry = {
        name: new Date(state.processedDate.processedDate),
        value: state.deathCases
      };
      const recoveredEntry: ChartEntry = {
        name: new Date(state.processedDate.processedDate),
        value: state.recoveredCases
      };
      confirmedCases.series.push(confirmedEntry);
      deathCases.series.push(deathsEntry);
      recoveredCases.series.push(recoveredEntry);
    });

    data.push(confirmedCases, deathCases, recoveredCases);
    return data;
  }

}

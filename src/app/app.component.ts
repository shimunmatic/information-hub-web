import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { ChartModel, ChartEntry } from './model/chart-model';
import { CountryState } from './model/country-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'information-hub-web';
  worldData: ChartModel[];
  germanyData: ChartModel[];


  constructor(private api: ApiService) {
    this.getWorldData();
    this.getGermanData();
  }

  getGermanData() {
    this.api.getAllForCountry("Germany").subscribe(resp => {

      let germanyState = resp.body;

      this.germanyData = this.convertToChartModel(germanyState)
    });

  }
  getWorldData() {
    this.api.getAllForWorld().subscribe(resp => {

      let worldState = resp.body;

      this.worldData = this.convertToChartModel(worldState)
    });
  }

  convertToChartModel(countryStates: CountryState[]): ChartModel[] {
    let data = new Array<ChartModel>();

    let modelConfirmedCases= new ChartModel();
    let modelDeathCases = new ChartModel;
    let modelRecoveredCases = new ChartModel;
    modelConfirmedCases.name = "Confirmed";
    modelDeathCases.name = "Deaths";
    modelRecoveredCases.name = "Recovered";

    let seriesConfirmed = new Array<ChartEntry>();
    let seriesDeaths = new Array<ChartEntry>();
    let seriesRecovered = new Array<ChartEntry>();

    for (let index = 0; index < countryStates.length; index++) {
      const state = countryStates[index];
      let confirmedEntry = new ChartEntry();
      confirmedEntry.name = new Date(state.processedDate.processedDate);
      confirmedEntry.value = state.confirmedCases;
      seriesConfirmed.push(confirmedEntry);

      let deathsEntry = new ChartEntry();
      deathsEntry.name = new Date(state.processedDate.processedDate);
      deathsEntry.value = state.deathCases;
      seriesDeaths.push(deathsEntry);

      let recoveredEntry = new ChartEntry();
      recoveredEntry.name = new Date(state.processedDate.processedDate);
      recoveredEntry.value = state.recoveredCases;
      seriesRecovered.push(recoveredEntry);
    }

    modelConfirmedCases.series = seriesConfirmed;
    modelDeathCases.series = seriesDeaths;
    modelRecoveredCases.series = seriesRecovered;

    data.push(modelConfirmedCases, modelDeathCases, modelRecoveredCases);

    return data;
  }

}

import { Component, Input } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { ApiService, ThemeService, LIGHT_THEME_CLASS } from 'services';
import { convertToChartModel } from 'utils';
import { ChartModel } from '../model/chart-model';

@Component({
  selector: 'corona-chart',
  templateUrl: './corona-chart.component.html',
  styleUrls: ['./corona-chart.component.scss']
})
export class CoronaChartComponent {

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = false;
  yAxisLabel = 'Color Value';
  timeline = true;
  autoScale = true;

  private _lightColorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private _darkColorScheme = {
    domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA']
  };

  colorScheme = this._lightColorScheme;

  _country: string;

  data: ChartModel[];
  _inProgress = true;

  @Input()
  set country(country: string) {
    this._country = country;
    this._inProgress = true;
    this.getDataForCountry();
  }

  constructor(private api: ApiService, private theme: ThemeService) {
    this.theme.onChange().pipe(filter(value => !!value)).subscribe(value => {
      if (value === LIGHT_THEME_CLASS) {
        this.colorScheme = this._lightColorScheme;
      } else {
        this.colorScheme = this._darkColorScheme;
      }
    });
  }

  getDataForCountry() {
    this.api.getAllForPlace(this._country)
      .pipe(
        map(data => convertToChartModel(data))
      ).subscribe(data => {
        this.data = data;
        this._inProgress = false;
      })
  }

}

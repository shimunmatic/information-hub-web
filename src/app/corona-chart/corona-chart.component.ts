import { Component, Input } from '@angular/core';
import { ChartModel } from '../model/chart-model';
import { Observable } from 'rxjs';
import { ApiService } from 'services';
import { map } from 'rxjs/operators';
import { convertToChartModel } from 'utils';

@Component({
  selector: 'corona-chart',
  templateUrl: './corona-chart.component.html',
  styleUrls: ['./corona-chart.component.css']
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

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  _country: string;

  data$: Observable<ChartModel[]>;

  @Input()
  set country(country: string) {
    this._country = country;
    this.getDataForCountry();
  }

  constructor(private api: ApiService) { }

  getDataForCountry() {
    this.data$ = this.api.getAllForPlace(this._country).pipe(map(data => convertToChartModel(data)));
  }

}

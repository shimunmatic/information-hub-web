import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartModel } from '../model/chart-model';

@Component({
  selector: 'app-corona-chart',
  templateUrl: './corona-chart.component.html',
  styleUrls: ['./corona-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronaChartComponent implements OnInit {

  // options
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

  @Input()
  data: ChartModel[];

  @Input()
  name: string;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // line, area
  constructor() { }

  ngOnInit(): void { }

  onSelect(event) {
    console.log(event);
  }

}

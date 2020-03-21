import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { convertCSVToArray } from 'convert-csv-to-array';
import { fromEvent, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { getStateCodeFromName, options } from './utils';

declare const google: any;

@Component({
  selector: 'corona-germany-map',
  templateUrl: './germany-map.component.html',
  styleUrls: ['./germany-map.component.scss']
})
export class GermanyMapComponent implements AfterViewInit {

  @ViewChild('germanyChartWrapper')
  chartWrapper: ElementRef<HTMLDivElement>;

  onWindowResize$ = fromEvent(window,'resize').pipe(debounce(() => timer(50)));

  data: any;
  chart: any;

  @Input()
  expanded = true;

  ngAfterViewInit() {
    this.setupChart();
    this.setupChartResizeListener();
  }

  private setupChart() {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: 'AIzaSyAGcAyepqsbLrm3NQ7lOvl3pHIAGG4Z_-o'
    });
    google.charts.setOnLoadCallback(() => {
      const url = `https://static.dwcdn.net/data/ZfgSW.csv?v=${new Date().getMilliseconds()}`;
      fetch(url)
        .then(response => response.text())
        .then(this.onChartLoad.bind(this))
        .catch(this.onChartError);
    });
  }

  private onChartLoad(csvString: string) {
    const transformedData: any[] = [];
    const csvArray = convertCSVToArray(csvString, { type: 'array' });
    csvArray[0].unshift('Province');
    transformedData.push(['Province', 'Name', 'Total', 'Deaths']);
    for (let i = 1; i < csvArray.length; i++) {
      transformedData.push(
        [
          getStateCodeFromName(
            csvArray[i][0]),
            csvArray[i][0] + ' at ' + csvArray[i][5],
            parseInt(csvArray[i][2], 10),
            parseInt(csvArray[i][3],
            10
          )
        ]
      );
    }
    this.data = google.visualization.arrayToDataTable(transformedData);
    this.chart = new google.visualization.GeoChart(this.chartWrapper.nativeElement);
    this.chart.draw(this.data, options);
  }

  private onChartError(error: any) {
    console.log(error);
  }

  private setupChartResizeListener() {
    this.onWindowResize$.subscribe(_ => {
      if (this.data && this.chart) {
        this.chart.draw(this.data, options);
      }
    })
  }

}

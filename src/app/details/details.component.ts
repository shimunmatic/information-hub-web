import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertToChartModel } from 'utils';
import { ChartModel } from '../model/chart-model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'corona-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  _country: string;

  data$: Observable<ChartModel[]>;

  @Input()
  set country(country: string) {
    this._country = country;
    this.getDataForCountry();
  }

  constructor(private api: ApiService) { }

  ngOnInit(): void { }

  getDataForCountry() {
    this.data$ = this.api.getAllForPlace(this._country).pipe(map(data => convertToChartModel(data)));
  }

}

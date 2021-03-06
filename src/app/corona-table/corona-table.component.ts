import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryState, ProcessedDate } from 'models';
import { ApiService } from 'services';


@Component({
  selector: 'corona-table',
  templateUrl: './corona-table.component.html',
  styleUrls: ['./corona-table.component.scss']
})
export class CoronaTableComponent implements AfterViewInit, OnInit {

  dates = this.api.dates;
  _date: ProcessedDate = this.dates[0];
  _country:string;
  _inProgress=true;

  @Input()
  set country(country: string) {
    this._inProgress=true;
    this._country = country;
    this.getDataForPlaceOnDate();
  }

  sums = {
    dead: 0,
    recovered: 0,
    confirmed: 0
  }

  dataSource = new MatTableDataSource([]);

  displayedColumns: string[] = ['countryName', 'stateName', 'lastUpdated', 'confirmedCases', 'deathCases', 'recoveredCases'];

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private api: ApiService) { }

  onSelectDate(date: ProcessedDate) {
    this._inProgress=true;
    this._date = date;
    this.getDataForPlaceOnDate();
  }

  private getDataForPlaceOnDate() {
    this.sums = { dead: 0, recovered: 0, confirmed: 0 }
    this.api.getForPlaceOnDate(this._country, this._date.id)
    .subscribe(data => {
      data.sort(this.compare);
      this.dataSource.data = data;
      data.forEach(it => {
        this.sums.confirmed += it.confirmedCases;
        this.sums.recovered += it.recoveredCases;
        this.sums.dead += it.deathCases;
      });
      this._inProgress = false;
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private compare( a: CountryState, b: CountryState ) {
    return a.countryName.localeCompare(b.countryName)
  }

}

import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryState, ProcessedDate } from 'models';
import { ApiService } from 'services';


@Component({
  selector: 'corona-table',
  templateUrl: './corona-table.component.html',
  styleUrls: ['./corona-table.component.css']
})
export class CoronaTableComponent implements AfterViewInit, OnInit {

  dates = this.api.dates;
  _date: ProcessedDate = this.dates[0];
  _country:string;

  @Input()
  set country(country: string) {
    this._country = country;
    this.getDataForPlaceOnDate();
  }

  coronaStats: CountryState[] = [];
  processedDates: ProcessedDate[] = [];
  countries: string[];

  dataSource = new MatTableDataSource(this.coronaStats);

  displayedColumns: string[] = ['countryName', 'stateName', 'lastUpdated', 'confirmedCases', 'deathCases', 'recoveredCases'];

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private api: ApiService) { }

  onSelectDate(date: ProcessedDate) {
    this._date = date;
    this.getDataForPlaceOnDate();
  }

  private getDataForPlaceOnDate() {
    this.api.getAllForPlaceOnDate(this._country, this._date.id).subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getCountryNames() {
    // this.api.getAllCountryNames()
    //   .subscribe(resp => {
    //     this.countries = resp;
    //     this.countries.sort();
    //     this.countries = ['World'].concat(this.countries);
    //   })
  }
  getProcessedDates() {
    // this.api.getAllProcessedDates()
    //   .subscribe(resp => {
    //     this.processedDates = resp;

    //     this.selectedProcessedDate = this.processedDates[0];
    //     this.getCoronaStatsForProcessedDate(this.selectedProcessedDate);
    //   });
  }

  getCoronaStats() {
    // this.api.getAll()
    //   .subscribe(resp => {
    //     this.coronaStats = resp;

    //     this.dataSource.data = this.coronaStats;
    //   });
  }

  getCoronaStatsForProcessedDate(date: ProcessedDate) {
    // this.api.getAllForProcessedDate(date.id)
    //   .subscribe(resp => {
    //     this.coronaStats = resp;

    //     this.dataSource.data = this.coronaStats;
    //     this.dataSource.sort = this.sort;

    //   });
  }

  getCoronaStatsForCountryAndProcessedDate(countryName: string, processedDate: ProcessedDate) {
    // this.api.getAllForCountryAndPorcessedDate(countryName, processedDate.id)
    //   .subscribe(resp => {
    //     this.coronaStats = resp;

    //     this.dataSource.data = this.coronaStats;
    //   });
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDateChanged(selectedProcessedDate: ProcessedDate) {
    // if (this.selectedCountry) {
    //   if (this.selectedCountry === 'World') {
    //     this.getCoronaStatsForProcessedDate(this.selectedProcessedDate);
    //   }
    //   else {
    //     this.getCoronaStatsForCountryAndProcessedDate(this.selectedCountry, this.selectedProcessedDate);
    //   }
    // } else {
    //   this.getCoronaStatsForProcessedDate(selectedProcessedDate);
    // }
  }

  onCountryChanged(countryName: string) {
    // if (countryName === 'World') {
    //   this.getCoronaStatsForProcessedDate(this.selectedProcessedDate);
    // }
    // else {
    //   this.getCoronaStatsForCountryAndProcessedDate(countryName, this.selectedProcessedDate);
    // }
  }
}

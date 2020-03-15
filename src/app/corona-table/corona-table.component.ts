import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { CountryState } from '../model/country-state';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessedDate } from '../model/processed-date';
import { MatSelectChange } from '@angular/material/select';
import { DataSource } from '@angular/cdk/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-corona-table',
  templateUrl: './corona-table.component.html',
  styleUrls: ['./corona-table.component.css']
})
export class CoronaTableComponent implements OnInit {
  coronaStats: CountryState[] = [];
  processedDates: ProcessedDate[] = [];
  selectedProcessedDate: ProcessedDate;
  selectedCountry: string;
  countries: string[];

  dataSource = new MatTableDataSource(this.coronaStats);

  displayedColumns: string[] = ['countryName', 'stateName', 'lastUpdated', 'confirmedCases', 'deathCases', 'recoveredCases'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getProcessedDates();
    this.getCountryNames();
  }

  ngAfterViewInit (){
    this.dataSource.sort = this.sort;
  }

  getCountryNames() {
    this.api.getAllCountryNames()
      .subscribe(resp => {
        this.countries = resp.body;
        this.countries.sort();
      })

  }
  getProcessedDates() {
    this.api.getAllProcessedDates()
      .subscribe(resp => {
        this.processedDates = resp.body;

        this.selectedProcessedDate = this.processedDates[0];
        this.getCoronaStatsForProcessedDate(this.selectedProcessedDate);
      });
  }

  getCoronaStats() {
    this.api.getAll()
      .subscribe(resp => {
        this.coronaStats = resp.body;

        this.dataSource.data = this.coronaStats;
      });
  }

  getCoronaStatsForProcessedDate(date: ProcessedDate) {
    this.api.getAllForProcessedDate(date.id)
      .subscribe(resp => {
        this.coronaStats = resp.body;

        this.dataSource.data = this.coronaStats;
        this.dataSource.sort = this.sort;

      });
  }

  getCoronaStatsForCountryAndProcessedDate(countryName: string, processedDate: ProcessedDate) {
    this.api.getAllForCountryAndPorcessedDate(countryName, processedDate.id)
      .subscribe(resp => {
        this.coronaStats = resp.body;

        this.dataSource.data = this.coronaStats;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDateChanged(selectedProcessedDate: ProcessedDate) {
    this.getCoronaStatsForProcessedDate(selectedProcessedDate);
  }

  onCountryChanged(countryName: string) {
    this.getCoronaStatsForCountryAndProcessedDate(countryName, this.selectedProcessedDate);
  }
}

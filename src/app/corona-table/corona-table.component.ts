import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { CountryState } from '../model/country-state';
import { ProcessedDate } from '../model/processed-date';


@Component({
  selector: 'app-corona-table',
  templateUrl: './corona-table.component.html',
  styleUrls: ['./corona-table.component.css']
})
export class CoronaTableComponent implements AfterViewInit, OnInit {
  coronaStats: CountryState[] = [];
  processedDates: ProcessedDate[] = [];
  selectedProcessedDate: ProcessedDate;
  selectedCountry: string;
  countries: string[];

  dataSource = new MatTableDataSource(this.coronaStats);

  displayedColumns: string[] = ['countryName', 'stateName', 'lastUpdated', 'confirmedCases', 'deathCases', 'recoveredCases'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.selectedCountry = "World";
    this.getProcessedDates();
    this.getCountryNames();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getCountryNames() {
    this.api.getAllCountryNames()
      .subscribe(resp => {
        this.countries = resp;
        this.countries.sort();
        this.countries = ["World"].concat(this.countries);
      })

  }
  getProcessedDates() {
    this.api.getAllProcessedDates()
      .subscribe(resp => {
        this.processedDates = resp;

        this.selectedProcessedDate = this.processedDates[0];
        this.getCoronaStatsForProcessedDate(this.selectedProcessedDate);
      });
  }

  getCoronaStats() {
    this.api.getAll()
      .subscribe(resp => {
        this.coronaStats = resp;

        this.dataSource.data = this.coronaStats;
      });
  }

  getCoronaStatsForProcessedDate(date: ProcessedDate) {
    this.api.getAllForProcessedDate(date.id)
      .subscribe(resp => {
        this.coronaStats = resp;

        this.dataSource.data = this.coronaStats;
        this.dataSource.sort = this.sort;

      });
  }

  getCoronaStatsForCountryAndProcessedDate(countryName: string, processedDate: ProcessedDate) {
    this.api.getAllForCountryAndPorcessedDate(countryName, processedDate.id)
      .subscribe(resp => {
        this.coronaStats = resp;

        this.dataSource.data = this.coronaStats;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDateChanged(selectedProcessedDate: ProcessedDate) {
    if (this.selectedCountry) {
      if (this.selectedCountry === "World") {
        this.getCoronaStatsForProcessedDate(this.selectedProcessedDate);
      }
      else {
        this.getCoronaStatsForCountryAndProcessedDate(this.selectedCountry, this.selectedProcessedDate);
      }
    } else {
      this.getCoronaStatsForProcessedDate(selectedProcessedDate);
    }
  }

  onCountryChanged(countryName: string) {
    if (countryName === "World") {
      this.getCoronaStatsForProcessedDate(this.selectedProcessedDate);
    }
    else {
      this.getCoronaStatsForCountryAndProcessedDate(countryName, this.selectedProcessedDate);
    }
  }
}

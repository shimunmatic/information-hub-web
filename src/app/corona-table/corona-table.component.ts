import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { CountryState } from '../model/country-state';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessedDate } from '../model/processed-date';
import { MatSelectChange } from '@angular/material/select';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-corona-table',
  templateUrl: './corona-table.component.html',
  styleUrls: ['./corona-table.component.css']
})
export class CoronaTableComponent implements OnInit {
  coronaStats: CountryState[] = [];
  processedDates: ProcessedDate[] = [];
  selectedProcessedDate: ProcessedDate;
  dataSource = new MatTableDataSource(this.coronaStats);

  displayedColumns: string[] = ['countryName', 'stateName', 'lastUpdated', 'confirmedCases', 'deathCases', 'recoveredCases'];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getProcessedDates();
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
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDateChanged(selectedProcessedDate: ProcessedDate) {
    this.getCoronaStatsForProcessedDate(selectedProcessedDate);
  }
}

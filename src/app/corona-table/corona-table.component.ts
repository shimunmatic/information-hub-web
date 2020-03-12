import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CountryState } from '../model/country-state';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-corona-table',
  templateUrl: './corona-table.component.html',
  styleUrls: ['./corona-table.component.css']
})
export class CoronaTableComponent implements OnInit {
  coronaStats: CountryState[] = [];
  dataSource = new MatTableDataSource(this.coronaStats);
  displayedColumns: string[] = ['countryName', 'stateName', 'lastUpdated', 'confirmedCases', 'deathCases', 'recoveredCases'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getCoronaStats();
  }

  getCoronaStats() {
    this.api.getAll()
    .subscribe(resp => {
      console.log(resp);

  
      for (const data of resp.body) {
        this.coronaStats.push(data);
      }

      this.dataSource.data = this.coronaStats;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

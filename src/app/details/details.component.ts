import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  _country: string;

  @Input()
  country: string;
  set(country: string) {
    this._country = country;
    console.log(country);
  }

  constructor() { }

  ngOnInit(): void { }

}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiService, StorageService } from 'services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'corona-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCountryComponent {

  countries$ = this.api.getAllCountryNames()
    .pipe(
      map(countries => countries.filter(country => !this.storage.getCountries().includes(country))
    )
  );

  constructor(private api: ApiService, private storage: StorageService) { }

}

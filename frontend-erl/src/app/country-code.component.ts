import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface CountryCode {
  country: string;
  code: string;
}

@Component({
    standalone:true,
  selector: 'app-country-code',
  templateUrl: './country-code.component.html',
  styleUrls: ['./country-code.component.css']
})
export class CountryCodeComponent implements OnInit {
  form: FormGroup;
  countryCodes: CountryCode[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      PickupContactNo: ['']
    });
  }

  ngOnInit() {
    this.fetchCountryCodes();
  }

  fetchCountryCodes() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name,idd')
      .pipe(
        map(countries => countries.map(country => ({
          country: country.name.common,
          code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')
        })))
      )
      .subscribe(
        codes => {
          this.countryCodes = codes;
          console.log('Country codes fetched:', this.countryCodes);
        },
        error => console.error('Error fetching country codes:', error)
      );
  }

  loadCountryCodes() {
    const datalist = document.getElementById('countryCodes') as HTMLDataListElement;
    
    // Clear existing options
    datalist.innerHTML = '';

    // Add new options
    this.countryCodes.forEach(country => {
      const option = document.createElement('option');
      option.value = country.code;
      option.text = `${country.country} (${country.code})`;
      datalist.appendChild(option);
    });
  }
}
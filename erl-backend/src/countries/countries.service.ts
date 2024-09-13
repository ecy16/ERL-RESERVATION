import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesService {
  private readonly countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },

    // Add more countries as needed
  ];

  findAll(): { code: string; name: string }[] {
    return this.countries;
  }

  findByCode(code: string): { code: string; name: string } | undefined {
    return this.countries.find(country => country.code === code);
  }
  
}

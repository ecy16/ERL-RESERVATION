import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll(): { code: string; name: string }[] {
    return this.countriesService.findAll();
  }

  @Get(':code')
  findByCode(@Param('code') code: string): { code: string; name: string } | undefined {
    return this.countriesService.findByCode(code);
  }
  
}

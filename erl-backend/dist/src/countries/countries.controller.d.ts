import { CountriesService } from './countries.service';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    findAll(): {
        code: string;
        name: string;
    }[];
    findByCode(code: string): {
        code: string;
        name: string;
    } | undefined;
}

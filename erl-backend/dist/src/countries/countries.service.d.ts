export declare class CountriesService {
    private readonly countries;
    findAll(): {
        code: string;
        name: string;
    }[];
    findByCode(code: string): {
        code: string;
        name: string;
    } | undefined;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
let CountriesService = class CountriesService {
    constructor() {
        this.countries = [
            { code: 'US', name: 'United States' },
            { code: 'CA', name: 'Canada' },
            { code: 'GB', name: 'United Kingdom' },
        ];
    }
    findAll() {
        return this.countries;
    }
    findByCode(code) {
        return this.countries.find(country => country.code === code);
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = __decorate([
    (0, common_1.Injectable)()
], CountriesService);
//# sourceMappingURL=countries.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let ClientsService = class ClientsService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async fetchAllClients() {
        const allClientQuery = await this.dataSource.createQueryRunner();
        await allClientQuery.connect();
        try {
            await allClientQuery.startTransaction();
            const allClients = await allClientQuery.manager.query(`select Account,Name,Account+'-'+Name+'-'+ (case when On_Hold = 1 then 'OnHold' else '' end) as Client_Info from client order by Name asc`);
            await allClientQuery.commitTransaction();
            return allClients;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async fetchOneClient1(custcode) {
        const clientQuery = await this.dataSource.createQueryRunner();
        await clientQuery.connect();
        try {
            await clientQuery.startTransaction();
            const client = await clientQuery.manager.query(`select * from Client where Account =@0 order by Name asc`, [custcode]);
            await clientQuery.commitTransaction();
            return client;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async fetchOneClient2(custname) {
        const clientQuery = await this.dataSource.createQueryRunner();
        await clientQuery.connect();
        try {
            await clientQuery.startTransaction();
            const client = await clientQuery.manager.query(`select * from Client where Name =@0 order by Name asc`, [custname]);
            await clientQuery.commitTransaction();
            return client;
        }
        catch (e) {
            throw new Error(e);
        }
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ClientsService);
//# sourceMappingURL=clients.service.js.map
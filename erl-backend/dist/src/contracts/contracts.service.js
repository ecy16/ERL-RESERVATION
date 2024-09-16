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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const contract_entity_1 = require("../entities/contract.entity");
const typeorm_1 = require("typeorm");
const SearchContracts_dto_1 = require("../dto/SearchContracts.dto");
const typeorm_2 = require("@nestjs/typeorm");
let ContractsService = class ContractsService {
    constructor(contractsRepo, contractEntity, contractDataSource) {
        this.contractsRepo = contractsRepo;
        this.contractEntity = contractEntity;
        this.contractDataSource = contractDataSource;
    }
    async createContract(createContractDto) {
        const contract = new contract_entity_1.ContractEntity(createContractDto);
        try {
            return await this.contractEntity.save(contract);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async updateContract(id, attrs) {
        const contract = await this.findContracts(id);
        if (!contract) {
            throw new common_1.NotFoundException('contract not found');
        }
        Object.assign(contract, attrs);
        return this.contractsRepo.save(contract);
    }
    async findContracts(id) {
        return await this.contractsRepo.findOne({
            where: { ContractId: id }
        });
    }
    async fetchContracts() {
        return await this.contractsRepo.find({});
    }
    async findAllContracts() {
        const contractsQuery = await this.contractDataSource.createQueryRunner();
        await contractsQuery.connect();
        try {
            await contractsQuery.startTransaction();
            const contracts = await contractsQuery.query(`
         SELECT a.ContractId,
                  ContractNo
                  ,companyName
                  ,CompanyCode
                  ,a.status
                  ,StartDate
                  ,EndDate
                  ,BillingDay
				  ,frequency
                    FROM _cplContracts a left join _cplContractDetails b on a.ContractId = b.ContractId where b.frequency ='onDemand' 


                  `);
            await contractsQuery.commitTransaction();
            return contracts;
        }
        catch (e) {
            throw new Error(`Failed to find any contracts: ${e.message}`);
        }
    }
    async searchContracts(searchContractsDto) {
        const query = this.contractsRepo.createQueryBuilder('contract');
        const { StartDate, EndDate, ...otherParams } = searchContractsDto;
        Object.keys(otherParams).forEach(key => {
            const value = SearchContracts_dto_1.SearchContractsDto[key];
            if (value) {
                query.andWhere(`contract.${key} = :${key}`, { [key]: value });
            }
        });
        if (StartDate && EndDate) {
            query.andWhere('contract.StartDate BETWEEN :StartDate AND :EndDate', { StartDate, EndDate });
        }
        else if (StartDate) {
            query.andWhere('contract.StartDate >= :StartDate', { StartDate });
        }
        else if (EndDate) {
            query.andWhere('contract.EndDate <= :EndDate', { EndDate });
        }
        try {
            return await query.getMany();
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to find any results: ${error.message}`);
        }
    }
    findContract(id) {
        return this.contractsRepo.findOne({ where: { ContractId: id } });
    }
    findOneContract(id) {
        return this.contractsRepo.findOne({ where: { ContractId: id } });
    }
    update(id, updateContractDto) {
        return `This action updates a #${id} contract`;
    }
    remove(id) {
        return `This action removes a #${id} contract`;
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(contract_entity_1.ContractEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.EntityManager,
        typeorm_1.DataSource])
], ContractsService);
//# sourceMappingURL=contracts.service.js.map
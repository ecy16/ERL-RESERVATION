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
exports.ContractDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const contract_detail_entity_1 = require("../entities/contract-detail.entity");
let ContractDetailsService = class ContractDetailsService {
    constructor(contractDetailsRepo, ContractDetailEntity, contractDetailDataSource) {
        this.contractDetailsRepo = contractDetailsRepo;
        this.ContractDetailEntity = ContractDetailEntity;
        this.contractDetailDataSource = contractDetailDataSource;
    }
    async createContractDetails(createContractDetailDto) {
        const contractDetail = new contract_detail_entity_1.ContractDetailEntity(createContractDetailDto);
        contractDetail.ContractDetailNo;
        try {
            const maxContractDetail = await this.contractDetailsRepo
                .createQueryBuilder("contractDetail")
                .select("MAX(contractDetail.ContractDetailNo)", "max")
                .where("contractDetail.ContractId = :contractId", { contractId: createContractDetailDto.ContractId })
                .getRawOne();
            const newContractDetailNo = (maxContractDetail.max || 0) + 1;
            contractDetail.ContractDetailNo = newContractDetailNo;
            return await this.contractDetailsRepo.save(contractDetail);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async updateContractDetails(id, attrs) {
        const contractDetail = await this.findOneContractsDetails(id);
        if (!contractDetail) {
            throw new common_1.NotFoundException('contractDetail not found');
        }
        Object.assign(contractDetail, attrs);
        return this.contractDetailsRepo.save(contractDetail);
    }
    async findOneContractsDetails(id) {
        return await this.contractDetailsRepo.findOne({
            where: { ContractDetailsId: id }
        });
    }
    async findAllContractsDetails() {
        const contractsDetailsQuery = await this.contractDetailDataSource.createQueryRunner();
        await contractsDetailsQuery.connect();
        try {
            await contractsDetailsQuery.startTransaction();
            const contractsDetail = await contractsDetailsQuery.query(`
          SELECT [ContractDetailsId]
          ,[ContractDetailNo]
                ,[ContractId]
                ,[status]
                ,[BookingType]
                ,[vehicleType]
                ,[Transmission]
                ,[NoOfVehicles]
                ,[ServiceFromDate]
                ,[ServiceToDate]
                ,[ChargeType]
                ,[ChargeAmount]
                ,[ChargeCurr]
                
                ,[frequency]





                FROM [dbo].[_cplContractDetails] order by ContractDetailsId desc `);
            await contractsDetailsQuery.commitTransaction();
            return contractsDetail;
        }
        catch (e) {
            throw new Error(`Failed to find any contractsDetail: ${e.message}`);
        }
    }
    async getCurrency(id) {
        const currencyQuery = await this.contractDetailDataSource.createQueryRunner();
        await currencyQuery.connect();
        try {
            await currencyQuery.startTransaction();
            const currencyDetails = await currencyQuery.query(`SELECT companyName,
      case when c.iCurrencyID = 0 then 'KES'
      else b.CurrencyCode end as currencyCode
      FROM _cplContracts cpl
      JOIN Client c ON c.account = cpl.companyCode
      left Join currency b on c.iCurrencyID = b. CurrencyLink
      where ContractId =${id}`);
            await currencyQuery.commitTransaction();
            console.log(currencyDetails[0]);
            return currencyDetails[0];
        }
        catch (e) {
            throw new Error(`Failed to find any currency: ${e.message}`);
        }
    }
    async getChargeType(id) {
        const chargeQuery = await this.contractDetailDataSource.createQueryRunner();
        await chargeQuery.connect();
        try {
            await chargeQuery.startTransaction();
            const chargeDetails = await chargeQuery.query(`select  code,Description_1,Description_2 from StkItem where ServiceItem=1 and ItemActive = 1
    `);
            await chargeQuery.commitTransaction();
            if (chargeDetails && chargeDetails.length > 0) {
                return chargeDetails;
            }
            else {
                throw new Error(`chargeType with id ${id} not found`);
            }
        }
        catch (e) {
            throw new Error(`Failed to find any chargeType: ${e.message}`);
        }
    }
    async findAllCharges() {
        const chargeQuery = await this.contractDetailDataSource.createQueryRunner();
        await chargeQuery.connect();
        try {
            await chargeQuery.startTransaction();
            const chargeDetails = await chargeQuery.query(`select  code,Description_1,Description_2 from StkItem where ServiceItem=1 and ItemActive = 1
    `);
            await chargeQuery.commitTransaction();
            if (chargeDetails && chargeDetails.length > 0) {
                return chargeDetails;
            }
            else {
                throw new Error(`chargeTypeS not found`);
            }
        }
        catch (e) {
            throw new Error(`Failed to find ALL chargeType: ${e.message}`);
        }
    }
    async findCurr() {
        const currencyQuery = this.contractDetailDataSource.createQueryRunner();
        await currencyQuery.connect();
        try {
            await currencyQuery.startTransaction();
            const currencyDetails = await currencyQuery.query(`
      SELECT
        y.companyName,
        CASE
          WHEN a.iCurrencyID = 0 THEN 'KES'
          ELSE b.CurrencyCode
        END AS currcode,
        a.*
      FROM
        _cplContractDetails z
      JOIN _cplContracts y ON z.ContractId = y.ContractId
      JOIN Client a ON y.companyName = a.Name
      LEFT JOIN currency b ON a.iCurrencyID = b.CurrencyLink
    `);
            await currencyQuery.commitTransaction();
            return currencyDetails;
        }
        catch (e) {
            await currencyQuery.rollbackTransaction();
            throw new Error(`Failed to find any currency: ${e.message}`);
        }
        finally {
            await currencyQuery.release();
        }
    }
    findAll() {
        return `This action returns all contractDetails`;
    }
    findOneContract(id) {
        return this.contractDetailsRepo.findOne({ where: { ContractDetailsId: id } });
    }
    async findRelatedContractDetails(id) {
        const contractsDetailsQuery = await this.contractDetailDataSource.createQueryRunner();
        await contractsDetailsQuery.connect();
        try {
            await contractsDetailsQuery.startTransaction();
            const contractsDetail = await contractsDetailsQuery.query(`
        select x.* from _cplContractDetails x join  _cplcontracts  y on x.ContractId=y.ContractId where x.ContractId =@0  order by ContractId desc `, [id]);
            await contractsDetailsQuery.commitTransaction();
            return contractsDetail;
        }
        catch (e) {
            throw new Error(`Failed to find any contracts: ${e.message}`);
        }
    }
    update(id, updateContractDetailDto) {
        return `This action updates a #${id} contractDetail`;
    }
    remove(id) {
        return `This action removes a #${id} contractDetail`;
    }
};
exports.ContractDetailsService = ContractDetailsService;
exports.ContractDetailsService = ContractDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(contract_detail_entity_1.ContractDetailEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.EntityManager,
        typeorm_1.DataSource])
], ContractDetailsService);
//# sourceMappingURL=contract-details.service.js.map
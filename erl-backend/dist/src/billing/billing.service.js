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
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const billing_entity_1 = require("../entities/billing.entity");
let BillingService = class BillingService {
    constructor(billingRepo, BillingEntity, BillingDataSource) {
        this.billingRepo = billingRepo;
        this.BillingEntity = BillingEntity;
        this.BillingDataSource = BillingDataSource;
    }
    create(createBillingDto) {
        return 'This action adds a new billing';
    }
    findAll() {
        return `This action returns all billing`;
    }
    findOne(id) {
        return `This action returns a #${id} billing`;
    }
    update(id, updateBillingDto) {
        return `This action updates a #${id} billing`;
    }
    remove(id) {
        return `This action removes a #${id} billing`;
    }
    async findAllBillings() {
        const billsQuery = await this.BillingDataSource.createQueryRunner();
        await billsQuery.connect();
        try {
            await billsQuery.startTransaction();
            const bills = await billsQuery.query(`
            SELECT [ReservationId]
                      ,[BookingNo]
                      ,format(cast([BookingDate] as date),'dd-MM-yyyy') as [BookingDate]
                      ,[BookingCategory]
                      ,[BookingType]
                      ,[Branch]
                      ,[BookingStatus]
                      ,[BookingFor]
                      ,isnull(a.[CompanyCode],b.CompanyCode) as CompanyCode
                      ,isnull (a.[companyName],b.companyName) as companyName
                      ,[PayeeCompanyName]
                      ,[Remarks]
                      ,[ChargeType]
                      ,[ChargeCurr]
                      ,[Source]
                      ,[SourceRefNo]
                      ,isnull(a.[ContractId],b.ContractId) as ContractId
                      ,[CreatedBy]
                      ,[ModifiedBy]
                      ,format([ModifiedOn],'dd-MM-yyyy') as [ModifiedOn]
                      ,format([CreatedOn],'dd-MM-yyyy HH:mm') as [CreatedOn],[BillingDay]
                  FROM  [dbo].[_cplReservations] a left join _cplContracts b on a.ContractId = b.ContractId `);
            await billsQuery.commitTransaction();
            return bills;
        }
        catch (e) {
            throw new Error(`Failed to find any bills: ${e.message}`);
        }
    }
    async FindBillDetailsById(reservationId) {
        const billsQuery = await this.BillingDataSource.createQueryRunner();
        await billsQuery.connect();
        try {
            await billsQuery.startTransaction();
            const bills = await billsQuery.query(` SELECT 
    b.BookingNo,
    b.BookingFor,
    c.CompanyName,
    c.CompanyCode,
	  c.ContractId,
	  c.ContractNo,
    a.TripNo,
    a.PickupAddress AS "PickUpAddress",
    a.DropAddress AS "DropAddress",
    a.FromDateTime AS "From DateTime",
	 format([FromDateTime],'dd-MM-yyyy HH:mm') as [FromDateTime],
							  format([ToDateTime],'dd-MM-yyyy HH:mm') as [ToDateTime],

    d.ServiceId,
    k.Description_1,
	  d.TripCharge
FROM 
    _cplReservationTrips a
INNER JOIN 
    _cplReservations b ON a.ReservationId = b.ReservationId
LEFT JOIN 
    _cplContracts c ON b.ContractId = c.ContractId
LEFT JOIN 
    _cplTripServices d ON a.TripId = d.TripId
LEFT JOIN 
    _cplVehicles f ON a.VehicleId = f.vehicleID
LEFT JOIN 
    _cplChaufferDrivers g ON a.DriverId = g.DriverId
	LEFT JOIN StkItem k ON d.serviceName = k.StockLink
WHERE 
    b.ReservationId = @0;
          `, [reservationId]);
            await billsQuery.commitTransaction();
            return bills;
        }
        catch (e) {
            throw new Error(`Failed to find any bills: ${e.message}`);
        }
    }
    async FetchBillDetailsById(reservationId) {
        const billsQuery = await this.BillingDataSource.createQueryRunner();
        await billsQuery.connect();
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(billing_entity_1.BillingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource])
], BillingService);
//# sourceMappingURL=billing.service.js.map
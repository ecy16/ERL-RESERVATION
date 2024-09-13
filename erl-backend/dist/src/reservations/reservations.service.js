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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const reservation_entity_1 = require("../entities/reservation.entity");
const rxjs_1 = require("rxjs");
let ReservationsService = class ReservationsService {
    constructor(reservationRepo, reservationEntity, reservDataSource) {
        this.reservationRepo = reservationRepo;
        this.reservationEntity = reservationEntity;
        this.reservDataSource = reservDataSource;
    }
    async findLastRec(Branch) {
        const lastRec = await this.reservDataSource.createQueryRunner();
        await lastRec.connect();
        try {
            await lastRec.startTransaction();
            const rec = await lastRec.query(`Declare @lastNo as int;
                Declare @lastID as int;
                set @lastID = (select count( ReservationId)
                from  _cplReservations a where a.Branch=@0
                )
                select format(cast(isnull(@lastID, 0) as int) + 1,'000#') as lastNo
                `, [Branch]);
            await lastRec.commitTransaction();
            return rec;
        }
        catch (e) {
            throw new Error(`Failed to records: ${e.message}`);
        }
    }
    searchView(searchReservationsDto) {
        const query = this.reservationRepo.createQueryBuilder('reservation');
        const { fromDate, toDate, ...otherParams } = searchReservationsDto;
        Object.keys(otherParams).forEach(key => {
            const value = otherParams[key];
            if (value) {
                query.andWhere(`reservation.${key} = :${key}`, { [key]: value });
            }
        });
        if (fromDate && toDate) {
            query.andWhere('reservation.BookingDate BETWEEN :fromDate AND :toDate', { fromDate, toDate });
        }
        else if (fromDate) {
            query.andWhere('reservation.BookingDate >= :fromDate', { fromDate });
        }
        else if (toDate) {
            query.andWhere('reservation.BookingDate <= :toDate', { toDate });
        }
        return (0, rxjs_1.from)(query.getMany()).pipe((0, rxjs_1.catchError)(error => {
            throw new Error(`Failed to find any results: ${error.message}`);
        }));
    }
    async searchResources(SearchResourcesDto) {
        const query = this.reservationRepo.createQueryBuilder('reservation');
        Object.keys(SearchResourcesDto).forEach(key => {
            const value = SearchResourcesDto[key];
            if (value) {
                query.andWhere(`reservation.${key} = :${key}`, { [key]: value });
            }
        });
        try {
            const results = await query.getMany();
            return results;
        }
        catch (e) {
            throw new Error(`Failed to find any results: ${e.message}`);
        }
    }
    async createReservation(addReservationDto) {
        const reservation = new reservation_entity_1.ReservationEntity(addReservationDto);
        const result = await this.fetchBookingRules(reservation.Branch);
        reservation.BookingNo = 'ERL-' + result[0].value + '-' + result[0].SequenceNo;
        try {
            return await this.reservationEntity.save(reservation);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async fetchBookingRules(Branch) {
        const bookingRulesQuery = await this.reservDataSource.createQueryRunner();
        await bookingRulesQuery.connect();
        try {
            await bookingRulesQuery.startTransaction();
            const bookingRules = await bookingRulesQuery.query(`
            select [value], format(case when count(b.Branch)  =0 then  [SequenceNo]  else count(b.Branch) +1 end,'000#') as [SequenceNo]
                from _cplAdminSettings a
                    left join _cplReservations b on a.[Control]=b.branch
                    where [Rule]='Branch' and a.[Control]=@0 group by [value],[SequenceNo]`, [Branch]);
            await bookingRulesQuery.commitTransaction();
            return bookingRules;
        }
        catch (e) {
            throw new Error(`Failed to find any records: ${e.message}`);
        }
    }
    async findAllReservations() {
        const reservationsQuery = await this.reservDataSource.createQueryRunner();
        await reservationsQuery.connect();
        try {
            await reservationsQuery.startTransaction();
            const reservations = await reservationsQuery.query(`
                SELECT [ReservationId]
                      ,[BookingNo]
                      ,format(cast([BookingDate] as date),'dd-MM-yyyy') as [BookingDate]
                      ,[BookingCategory]
                      ,[BookingType]
                      ,[Branch]
                      ,[BookingStatus]
                      ,[BookingFor]
                      ,[CompanyCode]
                      ,[companyName]
                      ,[PayeeCompanyName]
                      ,[Remarks]
                      ,[ChargeType]
                      ,[ChargeCurr]
                      ,[Source]
                      ,[SourceRefNo]
                      ,[ContractId]
                      ,[CreatedBy]
                      ,[ModifiedBy]
                      ,format([ModifiedOn],'dd-MM-yyyy') as [ModifiedOn]
                      ,format([CreatedOn],'dd-MM-yyyy HH:mm') as [CreatedOn]
                  FROM  [dbo].[_cplReservations] where  BookingDate = format(getdate(),'yyyy-MM-dd') order by CreatedOn desc `);
            await reservationsQuery.commitTransaction();
            return reservations;
        }
        catch (e) {
            throw new Error(`Failed to find any reservations: ${e.message}`);
        }
    }
    async findReservations(id) {
        return await this.reservationRepo.findOne({
            where: { ReservationId: id }
        });
    }
    async findReservationsById(reservationId) {
        const reservationsQuery = await this.reservDataSource.createQueryRunner();
        await reservationsQuery.connect();
        try {
            await reservationsQuery.startTransaction();
            const reservations = await reservationsQuery.query(`select *,case when BookingDate='' then '' else format(cast(BookingDate as date),'dd-MM-yyyy') end as ReservationDate from _cplReservations where ReservationId=@0 order by CreatedOn desc `, [reservationId]);
            await reservationsQuery.commitTransaction();
            return reservations;
        }
        catch (e) {
            throw new Error(`Failed to find any reservations: ${e.message}`);
        }
    }
    async updateReservation(id, attrs) {
        const reservation = await this.findReservations(id);
        if (!reservation) {
            throw new common_1.NotFoundException('reservation not found');
        }
        Object.assign(reservation, attrs);
        return this.reservationRepo.save(reservation);
    }
    async findBookingCategory() {
        const fetchCategory = await this.reservDataSource.createQueryRunner();
        await fetchCategory.connect();
        try {
            await fetchCategory.startTransaction();
            const bookingCategory = await fetchCategory.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'BookingCategory']);
            await fetchCategory.commitTransaction();
            return bookingCategory;
        }
        catch (e) {
            throw new Error(`Failed to find booking category: ${e.message}`);
        }
    }
    async findBookingType() {
        const fetchType = await this.reservDataSource.createQueryRunner();
        await fetchType.connect();
        try {
            await fetchType.startTransaction();
            const bookingType = await fetchType.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'BookingType']);
            await fetchType.commitTransaction();
            return bookingType;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async findBookingBranch() {
        const fetchBranch = await this.reservDataSource.createQueryRunner();
        await fetchBranch.connect();
        try {
            await fetchBranch.startTransaction();
            const bookingBranch = await fetchBranch.query(`SELECT DISTINCT category_Options 
                FROM _cplItemMaster 
                WHERE item_Name = 'Reservation' 
                  AND category_name = 'Branch';`);
            await fetchBranch.commitTransaction();
            return bookingBranch;
        }
        catch (e) {
            throw new Error(`Failed to find branches: ${e.message}`);
        }
    }
    async findBookingStatus() {
        const fetchStatus = await this.reservDataSource.createQueryRunner();
        await fetchStatus.connect();
        try {
            await fetchStatus.startTransaction();
            const bookingStatus = await fetchStatus.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'BookingStatus']);
            await fetchStatus.commitTransaction();
            return bookingStatus;
        }
        catch (e) {
            throw new Error(`Failed to find booking category: ${e.message}`);
        }
    }
    async findBookingChargeType() {
        const ChargeType = await this.reservDataSource.createQueryRunner();
        await ChargeType.connect();
        try {
            await ChargeType.startTransaction();
            const BookingChargeType = await ChargeType.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'ChargeType']);
            await ChargeType.commitTransaction();
            return BookingChargeType;
        }
        catch (e) {
            throw new Error(`Failed to find booking category: ${e.message}`);
        }
    }
    async findBookingSource() {
        const source = await this.reservDataSource.createQueryRunner();
        await source.connect();
        try {
            await source.startTransaction();
            const bookingSource = await source.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'Source']);
            await source.commitTransaction();
            return bookingSource;
        }
        catch (e) {
            throw new Error(`Failed to find booking category: ${e.message}`);
        }
    }
    async AddBookingPaymentDetails(id, addReservationPaymentsDto) {
        const reservationPayments = new reservation_entity_1.ReservationEntity(addReservationPaymentsDto);
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(reservation_entity_1.ReservationEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.EntityManager,
        typeorm_1.DataSource])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map
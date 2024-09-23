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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../entities/transaction.entity");
let TransactionsService = class TransactionsService {
    constructor(transactionRepo, transactionEntity, transactionDatasource) {
        this.transactionRepo = transactionRepo;
        this.transactionEntity = transactionEntity;
        this.transactionDatasource = transactionDatasource;
    }
    async createTransaction(createTransactionDto) {
        const transaction = new transaction_entity_1.TransactionEntity(createTransactionDto);
        Object.assign(transaction, createTransactionDto);
        try {
            return await this.transactionEntity.save(transaction);
        }
        catch (err) {
            throw new common_1.BadRequestException(`SOMETHING WENT WRONG: ${err.message}`);
        }
    }
    async fetchTransactionsById1(id) {
        try {
            return this.transactionRepo.findOne({ where: { TransactionId: id } });
        }
        catch (e) {
            throw new Error(`Failed to find Trannsactions: ${e.message}`);
        }
    }
    async fetchTransactionsById(id) {
        const queryRunner = this.transactionDatasource.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            const transaction = await queryRunner.query(`
        SELECT 
          a.TripId, a.tripNumber, a.ReservationId, a.FromDateTime, a.ToDateTime, a.PickupAddress, 
          a.DropAddress, a.PickupContactNo, a.PickupEmail, a.vehicleID, a.VehicleMake, a.VehicleModel,
          a.PickupFirstName + ' ' + a.PickupLastName AS [PickupName], 
          FORMAT(a.FromDateTime, 'dd-MM-yyyy HH:mm') AS [TripFromDateTime], 
          a.ArrivalFlightDateTime, a.ArrivalFlightNo, a.DepartureFlightDateTime, a.DepartureFlightNo, 
          a.Remarks, t.vehicleRegNo, FORMAT(a.ToDateTime, 'dd-MM-yyyy HH:mm') AS [TripToDateTime], 
          b.BookingFor, b.BookingStatus, b.Branch, b.BookingNo, b.BookingCategory, b.BookingType, 
          b.Source, b.companyName, d.DriverFirstName + ' ' + d.DriverLastName AS [DriverName], 
          t.TransactionId, t.MileageIN, t.MileageOUT, t.FuelIN, t.FuelOUT, t.[Transaction]
        FROM _cplreservationtrips a
        JOIN _cplReservations b ON a.ReservationId = b.ReservationId
        LEFT JOIN _cplVehicles c ON a.VehicleId = c.vehicleID
        LEFT JOIN _cplChaufferDrivers d ON a.DriverId = d.DriverId
        LEFT JOIN _cplTransactions t ON t.TripId = a.TripId
        WHERE t.TransactionId = @0
      `, [id]);
            await queryRunner.commitTransaction();
            return transaction.length ? transaction[0] : null;
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            throw new Error(`Failed to find Transaction: ${e.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAllTransactions() {
        const transactionsQuery = await this.transactionDatasource.createQueryRunner();
        await transactionsQuery.connect();
        try {
            await transactionsQuery.startTransaction();
            const transactions = await transactionsQuery.query(`
select a.TripId,a.tripNumber,a.ReservationId,a.FromDateTime,a.ToDateTime,a.PickupAddress,a.DropAddress,a.PickupContactNo,a.PickupEmail,a.vehicleID,a.VehicleMake,a.TripStatus,
a.VehicleModel,a.PickupFirstName + ' ' + a.PickupLastName AS [PickupName],format(a.FromDateTime,'dd-MM-yyyy HH:mm') [TripFromDateTime],a.ArrivalFlightDateTime
,a.ArrivalFlightNo,a.DepartureFlightDateTime,a.DepartureFlightNo,a.Remarks,t.vehicleRegNo,

format(a.FromDateTime,'dd-MM-yyyy ') as FromDate,format(a.ToDateTime,'dd-MM-yyyy ') as ToDate ,
				format(a.FromDateTime,' HH:mm:ss') as FromTime,format(a.ToDateTime,'HH:mm:ss') as ToTime,

format(a.ToDateTime,'dd-MM-yyyy HH:mm') [TripToDateTime], b.BookingFor,b.BookingStatus,b.Branch,b.BookingNo,b.BookingCategory,b.BookingType,b.Source,b.companyName, d.DriverFirstName+' '+d.DriverLastName [DriverName] ,t.TransactionId,t.MileageIN,t.MileageOUT,t.FuelIN,t.FuelOUT,t.[Transaction] from _cplreservationtrips a 
                                join _cplReservations b on a.ReservationId=b.ReservationId left join _cplVehicles c on a.VehicleId = c.vehicleID left join _cplChaufferDrivers d on a.DriverId = d.DriverId left join _cplTransactions t on t.TripId = a.TripId where TransactionId is NOT NULL


                `);
            await transactionsQuery.commitTransaction();
            return transactions;
        }
        catch (e) {
            throw new Error(`Failed to find any transactions: ${e.message}`);
        }
    }
    findOne(id) {
        return `This action returns a #${id} transaction`;
    }
    async updateTransaction(id, attrs) {
        const transaction = await this.fetchTransactionsById(id);
        if (!transaction) {
            throw new common_1.NotFoundException('transactions not found');
        }
        Object.assign(transaction, attrs);
        return this.transactionRepo.save(transaction);
    }
    remove(id) {
        return `This action removes a #${id} transaction`;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map
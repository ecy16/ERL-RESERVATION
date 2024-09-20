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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservationTrip_entity_1 = require("../entities/reservationTrip.entity");
const typeorm_2 = require("typeorm");
const View_entity_1 = require("../entities/View.entity");
let TripsService = class TripsService {
    constructor(tripsRepo, reservationDetailsRepo, tripsEntity, tripDataSource) {
        this.tripsRepo = tripsRepo;
        this.reservationDetailsRepo = reservationDetailsRepo;
        this.tripsEntity = tripsEntity;
        this.tripDataSource = tripDataSource;
    }
    async createTrip(addTripsDto) {
        const reservationTrip = new reservationTrip_entity_1.ReservationTripEntity(addTripsDto);
        const lastTripNo = await this.findLastRelatedTrips(Number(reservationTrip.ReservationId));
        reservationTrip.tripNumber = (lastTripNo[0].lastNo);
        try {
            return await this.tripsEntity.save(reservationTrip);
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async findAllTrips() {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(` select a.*,    a.PickupFirstName + ' ' + a.PickupLastName AS [PickupName],
                format(a.FromDateTime,'dd-MM-yyyy HH:mm') [TripFromDateTime],format(a.ToDateTime,'dd-MM-yyyy HH:mm') [TripToDateTime], b.BookingFor,b.BookingStatus,b.Branch,b.BookingNo,b.BookingCategory,b.BookingType,b.Source,b.companyName, c.VehicleMake as chosenMake,c.VehicleModel as chosenModel,c.vehicleRegNo as chosenRegNo,d.DriverFirstName+' '+d.DriverLastName [DriverName]  from _cplreservationtrips a 
                                join _cplReservations b on a.ReservationId=b.ReservationId left join _cplVehicles c on a.VehicleId = c.vehicleID left join _cplChaufferDrivers d on a.DriverId = d.DriverId`);
            await trip.commitTransaction();
            return tripInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async findTrips(id) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(`select  a.*,b.BookingCategory,b.BookingNo,
format(FromDateTime,'dd-MM-yyyy HH:mm') as FromDate,
                format(ToDateTime,'dd-MM-yyyy HH:mm') as ToDate from _cplReservationTrips  a 
                join _cplReservations b on a.ReservationId = b.ReservationId where a.TripId=${(id)}`);
            await trip.commitTransaction();
            return tripInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async findTrips1(id) {
        try {
            return this.tripsRepo.findOne({ where: { TripId: id } });
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async updateTrip(id, attrs) {
        const trips = await this.findTrips1(id);
        if (!trips) {
            throw new common_1.NotFoundException('trips not found');
        }
        Object.assign(trips, attrs);
        return this.tripsRepo.save(trips);
    }
    async findRelatedTrips(reservationId) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(`select TOP 1 b.companyName,a.*,d.DriverFirstName+' '+d.DriverLastName [Driver Name] ,b.BookingCategory,b.BookingNo,b.BookingFor,ArrivalFlightDateTime,format(FromDateTime,'dd-MM-yyyy HH:mm') as FromDate,format(ToDateTime,'dd-MM-yyyy HH:mm') as ToDate 
                from _cplReservationTrips  a 
                left join _cplReservations b on a.ReservationId = b.ReservationId 
                left join _cplVehicles c on a.VehicleId = c.vehicleID 
				left join _cplChaufferDrivers d on a.DriverId = d.DriverId
				where a.TripId=@0  `, [reservationId]);
            await trip.commitTransaction();
            return tripInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async findAssignmentTrips(id) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(`select DISTINCT b.companyName,c.vehicleRegNo,c.vehicleID, a.*,d.DriverFirstName+' '+d.DriverLastName [Driver Name] ,b.BookingCategory,b.BookingNo,b.BookingFor,ArrivalFlightDateTime,format(FromDateTime,'dd-MM-yyyy HH:mm') as FromDate,format(ToDateTime,'dd-MM-yyyy HH:mm') as ToDate 
                from _cplReservationTrips  a 
                left join _cplReservations b on a.ReservationId = b.ReservationId 
                left join _cplVehicles c on a.VehicleId = c.vehicleID 
				left join _cplChaufferDrivers d on a.DriverId = d.DriverId
				where a.TripId=@0`, [id]);
            await trip.commitTransaction();
            console.log(tripInfo, 'tripInfo');
            return tripInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async findRelatedReservationTrips(reservationId) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(`select b.companyName,c.vehicleRegNo,c.vehicleID, a.*,d.DriverFirstName+' '+d.DriverLastName [Driver Name] ,b.BookingCategory,b.BookingNo,ArrivalFlightDateTime,format(FromDateTime,'dd-MM-yyyy HH:mm') as FromDate,format(ToDateTime,'dd-MM-yyyy HH:mm') as ToDate from _cplReservationTrips  a join _cplReservations b on a.ReservationId = b.ReservationId left join _cplVehicles c on a.VehicleId = c.vehicleID 
				left join _cplChaufferDrivers d on a.DriverId = d.DriverId
				where a.ReservationId=@0  `, [reservationId]);
            await trip.commitTransaction();
            return tripInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async fetchResvTrip(reservationId) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(`SELECT 
          a.TripId, a.tripNumber, a.ReservationId, a.FromDateTime, a.ToDateTime, a.PickupAddress, 
          a.DropAddress, a.PickupContactNo, a.PickupEmail, a.vehicleID, a.VehicleMake, a.VehicleModel,h.serviceCode,h.serviceName,
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
		LEFT JOIN _cplTripServices h ON a.TripId = h.TripId
        LEFT JOIN _cplChaufferDrivers d ON a.DriverId = d.DriverId
        LEFT JOIN _cplTransactions t ON t.TripId = a.TripId
        WHERE a.ReservationId=@0`, [reservationId]);
            await trip.commitTransaction();
            return tripInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async fetchSortedTrips() {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(`select c.vehicleRegNo,c.vehicleID, a.*,d.DriverFirstName+' '+d.DriverLastName [DriverName] ,b.BookingFor,e.ContractId,d.email,
				case when b.companyName=' ' then e.companyName else b.companyName end [companyName],
				b.BookingCategory,b.BookingNo,
				format(FromDateTime,'dd-MM-yyyy ') as FromDate,format(ToDateTime,'dd-MM-yyyy ') as ToDate ,
				format(FromDateTime,' HH:mm:ss') as FromTime,format(ToDateTime,'HH:mm:ss') as ToTime , a.PickupFirstName +'' +a.PickupLastName [PickupName]
				from _cplReservationTrips  a join _cplReservations b on a.ReservationId = b.ReservationId  left join _cplVehicles c on a.VehicleId = c.vehicleID 
				left join _cplChaufferDrivers d on a.DriverId = d.DriverId left join _cplContracts e on b.ContractId=e.ContractId  `);
            await trip.commitTransaction();
            return tripInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async fetchDeliverTrips(TripId) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(`select c.vehicleID, a.*,d.DriverFirstName+' '+d.DriverLastName [DriverName] ,b.BookingFor,e.ContractId,d.email,
				case when b.companyName=' ' then e.companyName else b.companyName end [companyName],
				b.BookingCategory,b.BookingNo,
				format(FromDateTime,'dd-MM-yyyy ') as FromDate,format(ToDateTime,'dd-MM-yyyy ') as ToDate ,
				format(FromDateTime,' HH:mm:ss') as FromTime,format(ToDateTime,'HH:mm:ss') as ToTime
				from _cplReservationTrips  a join _cplReservations b on a.ReservationId = b.ReservationId  left join _cplVehicles c on a.VehicleId = c.vehicleID 
				left join _cplChaufferDrivers d on a.DriverId = d.DriverId left join _cplContracts e on b.ContractId=e.ContractId where a.TripId=@0 `, [TripId]);
            await trip.commitTransaction();
            return tripInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async findLastRelatedTrips(reservationId) {
        const relatedLastNo = this.tripDataSource.createQueryRunner();
        await relatedLastNo.connect();
        try {
            await relatedLastNo.startTransaction();
            const lastNo = await relatedLastNo.manager.query(`select isnull(count(ReservationId),0) +1 as lastNo
                from _cplReservationTrips
                where ReservationId=@0`, [reservationId]);
            await relatedLastNo.commitTransaction();
            return lastNo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async fetchFuelLevel() {
        const fetchFuelLevel = await this.tripDataSource.createQueryRunner();
        await fetchFuelLevel.connect();
        try {
            await fetchFuelLevel.startTransaction();
            const fuelLevel = await fetchFuelLevel.manager.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and (category_name=@1 or category_name=@2)`, ['ReservationTrip', 'FuelIN', 'FuelOut']);
            await fetchFuelLevel.commitTransaction();
            return fuelLevel;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async driverService() {
        const driverService = await this.tripDataSource.createQueryRunner();
        await driverService.connect();
        try {
            await driverService.startTransaction();
            const serviceStatus = await driverService.manager.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['ReservationTrip', 'DriverServiceStatus']);
            await driverService.commitTransaction();
            return serviceStatus;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async tripStatus() {
        const tripStatusQuery = await this.tripDataSource.createQueryRunner();
        await tripStatusQuery.connect();
        try {
            await tripStatusQuery.startTransaction();
            const tripStatus = await tripStatusQuery.manager.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['ReservationTrip', 'TripStatus']);
            await tripStatusQuery.commitTransaction();
            return tripStatus;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async assignVehicle(model) {
        const assignVehicleQuery = await this.tripDataSource.createQueryRunner();
        await assignVehicleQuery.connect();
        try {
            await assignVehicleQuery.startTransaction();
            const vehicle = await assignVehicleQuery.manager.query(`select  * from _cplVehicles where vehicleModel=@0 order By vehicleRegNo`, [model]);
            await assignVehicleQuery.commitTransaction();
            return vehicle;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async assignReg(vehicleValidationDto) {
        const vehicle = new reservationTrip_entity_1.ReservationTripEntity(vehicleValidationDto);
        const { vehicleID, vehicleRegNo, FromDateTime, ToDateTime } = vehicle;
        const assignRegQuery = this.tripDataSource.createQueryRunner();
        await assignRegQuery.connect();
        try {
            await assignRegQuery.startTransaction();
            const overlappingReservations = await assignRegQuery.manager.query(`
        SELECT COUNT(*)
        FROM _cplReservationTrips
        WHERE VehicleId = $1
        AND (
            (FromDateTime < $3 AND ToDateTime > $2)  -- Overlaps if reservation starts before and ends after the given range
        )
        `, [vehicleID, FromDateTime, ToDateTime]);
            if (overlappingReservations[0].count > 0) {
                throw new common_1.BadRequestException('Vehicle is not available for the selected dates.');
            }
            await assignRegQuery.commitTransaction();
            return vehicle;
        }
        catch (error) {
            await assignRegQuery.rollbackTransaction();
            throw new common_1.BadRequestException(error.message);
        }
        finally {
            await assignRegQuery.release();
        }
    }
    async assignDriver(driverValidationDto) {
        const trip = new reservationTrip_entity_1.ReservationTripEntity(driverValidationDto);
        const { DriverId, DriverFirstName, FromDateTime, ToDateTime } = trip;
        const assignDriverQuery = this.tripDataSource.createQueryRunner();
        await assignDriverQuery.connect();
        try {
            await assignDriverQuery.startTransaction();
            const Driver = await assignDriverQuery.manager.query(`SELECT * FROM _cplReservationTrips 
                 WHERE DriverId = @0 
                 AND DriverFirstName = @3
                 AND (
                     (FORMAT(FromDateTime, 'yyyy-MM-dd HH:mm') BETWEEN @1 AND @2)
                     OR (FORMAT(ToDateTime, 'yyyy-MM-dd HH:mm') BETWEEN @1 AND @2)
                 )`, [DriverId, FromDateTime, ToDateTime, DriverFirstName]);
            await assignDriverQuery.commitTransaction();
            return Driver;
        }
        catch (e) {
            await assignDriverQuery.rollbackTransaction();
            throw new common_1.BadRequestException(e.message);
        }
        finally {
            await assignDriverQuery.release();
        }
    }
    async addVehicleMovement(TripId, vehicleMovementDto) {
        const reservationTrip = new reservationTrip_entity_1.ReservationTripEntity(vehicleMovementDto);
        reservationTrip.TripId = TripId;
        try {
            return await this.tripsEntity.save(reservationTrip);
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async searchResources(searchResourcesDto) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            let query = `
                select * from _cplScheduled where 1=1
                     
            `;
            const parameters = [];
            const parameterNames = {};
            let paramCount = 1;
            Object.keys(searchResourcesDto).forEach(key => {
                const value = searchResourcesDto[key];
                if (value) {
                    query += ` and ${key} = $${paramCount}`;
                    parameters.push(value);
                    parameterNames[key] = paramCount;
                    paramCount++;
                }
            });
            const tripInfo = await trip.query(query, parameters);
            await trip.commitTransaction();
            return tripInfo;
        }
        catch (e) {
            await trip.rollbackTransaction();
            throw new Error(`Failed to find trips: ${e.message}`);
        }
        finally {
            await trip.release();
        }
    }
    async searchReservation(searchParams) {
        const query = this.reservationDetailsRepo.createQueryBuilder('reservations');
        Object.keys(searchParams).forEach(key => {
            const value = searchParams[key];
            if (value) {
                if (key === 'FromDate' || key === 'ToDate') {
                    query.andWhere(`reservations.${key} BETWEEN :${key}Start AND :${key}End`, {
                        [`${key}Start`]: `${value} 00:00:00`,
                        [`${key}End`]: `${value} 23:59:59`,
                    });
                }
                else {
                    query.andWhere(`reservations.${key} LIKE :${key}`, { [`${key}`]: `%${value}%` });
                }
            }
        });
        return query.getMany();
    }
    async searchTripsSchedules(searchParams) {
        const query = this.reservationDetailsRepo.createQueryBuilder('reservations');
        Object.keys(searchParams).forEach(key => {
            const value = searchParams[key];
            if (value) {
                if (key === 'FromDate' || key === 'ToDate') {
                    if (key === 'FromDate') {
                        query.andWhere('reservations.FromDateTime >= :FromDateStart', {
                            FromDateStart: `${value} 00:00:00`,
                        });
                    }
                    else if (key === 'ToDate') {
                        query.andWhere('reservations.ToDateTime <= :ToDateEnd', {
                            ToDateEnd: `${value} 23:59:59`,
                        });
                    }
                }
                else {
                    query.andWhere(`reservations.${key} LIKE :${key}`, { [`${key}`]: `%${value}%` });
                }
            }
        });
        return query.getMany();
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservationTrip_entity_1.ReservationTripEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(View_entity_1.ReservationDetailsViewEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource])
], TripsService);
//# sourceMappingURL=trips.service.js.map
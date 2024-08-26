import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationTripEntity } from '../entities/reservationTrip.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AddTripDto } from '../dto/add-trip.dto';
import { VehicleValidationDto } from '../dto/vehicleValidation.dto';
import { DriverValidationDto } from 'src/dto/driverValidation.dto';
import { SearchResourcesDto } from 'src/dto/search-resources.dto';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { ReservationDetailsViewEntity } from 'src/entities/View.entity';

// import {ReservationEntity} from "../entities/trips.entity";

@Injectable()
export class TripsService {
    constructor(
        @InjectRepository(ReservationTripEntity)
        private readonly tripsRepo: Repository<ReservationTripEntity>,

        @InjectRepository(ReservationDetailsViewEntity)
        private readonly reservationDetailsRepo: Repository<ReservationDetailsViewEntity>,

        private readonly tripsEntity: EntityManager,
        private readonly tripDataSource: DataSource,
        // private readonly tripDataSource: DataSource,
    ) { }

    async createTrip(addTripsDto: AddTripDto) {
        console.log(addTripsDto, 'AddTripDto')
        const reservationTrip = new ReservationTripEntity(addTripsDto);
        const lastTripNo = await this.findLastRelatedTrips(
            Number(reservationTrip.ReservationId)
        );
        console.log(lastTripNo)
        reservationTrip.tripNumber = (lastTripNo[0].lastNo);
        console.log(reservationTrip, 'ReservationTrip')
        try {

            return await this.tripsEntity.save(reservationTrip);
        } catch (err) {
            throw new Error(err.message);
        }
    }



    ////////////// <fetching all trips>///////////////////
    async findAllTrips() {

        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(
                ` select a.*,    a.PickupFirstName + ' ' + a.PickupLastName AS [PickupName],
                format(a.FromDateTime,'dd-MM-yyyy HH:mm') [TripFromDateTime],format(a.ToDateTime,'dd-MM-yyyy HH:mm') [TripToDateTime], b.BookingFor,b.BookingStatus,b.Branch,b.BookingNo,b.BookingCategory,b.BookingType,b.Source,b.companyName, c.VehicleMake as chosenMake,c.VehicleModel as chosenModel,c.vehicleRegNo as chosenRegNo,d.DriverFirstName+' '+d.DriverLastName [DriverName]  from _cplreservationtrips a 
                                join _cplReservations b on a.ReservationId=b.ReservationId left join _cplVehicles c on a.VehicleId = c.vehicleID left join _cplChaufferDrivers d on a.DriverId = d.DriverId`


            );
            await trip.commitTransaction();
            return tripInfo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }









    async findTrips(id: number) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(
                `select  a.*,b.BookingCategory,format(FlightDateTime,'dd-MM-yyyy HH:mm') as FlightDate,format(FromDateTime,'dd-MM-yyyy HH:mm') as FromDate,format(ToDateTime,'dd-MM-yyyy HH:mm') as ToDate from _cplReservationTrips  a join _cplReservations b on a.ReservationId = b.ReservationId where a.TripId=@0`,
                [id],
            );
            await trip.commitTransaction();
            return tripInfo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }


    async findTrips1(id: number) {

        try {
            return this.tripsRepo.findOne({ where: { TripId: id } });
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }

    async updateTrip(id: number, attrs: Partial<ReservationTripEntity>) {
        const trips = await this.findTrips1(id);
        if (!trips) {
            throw new NotFoundException('trips not found');
        }
        Object.assign(trips, attrs);
        return this.tripsRepo.save(trips);
    }



    async findRelatedTrips(reservationId: number) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(
                `select b.companyName,c.vehicleRegNo,c.vehicleID, a.*,d.DriverFirstName+' '+d.DriverLastName [Driver Name] ,b.BookingCategory,b.BookingNo,b.BookingFor,FlightDateTime,format(FromDateTime,'dd-MM-yyyy HH:mm') as FromDate,format(ToDateTime,'dd-MM-yyyy HH:mm') as ToDate from _cplReservationTrips  a join _cplReservations b on a.ReservationId = b.ReservationId left join _cplVehicles c on a.VehicleId = c.vehicleID 
				left join _cplChaufferDrivers d on a.DriverId = d.DriverId
				where a.TripId=@0  ` , [reservationId],
            );
            await trip.commitTransaction();
            return tripInfo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }

    async findRelatedReservationTrips(reservationId: number) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(
                `select b.companyName,c.vehicleRegNo,c.vehicleID, a.*,d.DriverFirstName+' '+d.DriverLastName [Driver Name] ,b.BookingCategory,b.BookingNo,FlightDateTime,format(FromDateTime,'dd-MM-yyyy HH:mm') as FromDate,format(ToDateTime,'dd-MM-yyyy HH:mm') as ToDate from _cplReservationTrips  a join _cplReservations b on a.ReservationId = b.ReservationId left join _cplVehicles c on a.VehicleId = c.vehicleID 
				left join _cplChaufferDrivers d on a.DriverId = d.DriverId
				where a.ReservationId=@0  ` , [reservationId],
            );
            await trip.commitTransaction();
            return tripInfo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }

    async fetchSortedTrips() {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(
                `select c.vehicleRegNo,c.vehicleID, a.*,d.DriverFirstName+' '+d.DriverLastName [DriverName] ,b.BookingFor,e.ContractId,d.email,
				case when b.companyName=' ' then e.companyName else b.companyName end [companyName],
				b.BookingCategory,b.BookingNo,format(FlightDateTime,'dd-MM-yyyy HH:mm') as FlightDate,
				format(FromDateTime,'dd-MM-yyyy ') as FromDate,format(ToDateTime,'dd-MM-yyyy ') as ToDate ,
				format(FromDateTime,' HH:mm:ss') as FromTime,format(ToDateTime,'HH:mm:ss') as ToTime  a.PickupFirstName + '' +a.PickupLastName [PickupName]
				from _cplReservationTrips  a join _cplReservations b on a.ReservationId = b.ReservationId  left join _cplVehicles c on a.VehicleId = c.vehicleID 
				left join _cplChaufferDrivers d on a.DriverId = d.DriverId left join _cplContracts e on b.ContractId=e.ContractId`

            );
            await trip.commitTransaction();
            return tripInfo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }





    async fetchDeliverTrips(TripId: number) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(
                `select c.vehicleRegNo,c.vehicleID, a.*,d.DriverFirstName+' '+d.DriverLastName [DriverName] ,b.BookingFor,e.ContractId,d.email,
				case when b.companyName=' ' then e.companyName else b.companyName end [companyName],
				b.BookingCategory,b.BookingNo,format(FlightDateTime,'dd-MM-yyyy HH:mm') as FlightDate,
				format(FromDateTime,'dd-MM-yyyy ') as FromDate,format(ToDateTime,'dd-MM-yyyy ') as ToDate ,
				format(FromDateTime,' HH:mm:ss') as FromTime,format(ToDateTime,'HH:mm:ss') as ToTime
				from _cplReservationTrips  a join _cplReservations b on a.ReservationId = b.ReservationId  left join _cplVehicles c on a.VehicleId = c.vehicleID 
				left join _cplChaufferDrivers d on a.DriverId = d.DriverId left join _cplContracts e on b.ContractId=e.ContractId`, [TripId]

            );
            await trip.commitTransaction();
            return tripInfo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }


    async findLastRelatedTrips(reservationId: number) {
        const relatedLastNo = this.tripDataSource.createQueryRunner();
        await relatedLastNo.connect();
        try {
            await relatedLastNo.startTransaction();
            const lastNo = await relatedLastNo.manager.query(
                `select isnull(count(ReservationId),0) +1 as lastNo
                from _cplReservationTrips
                where ReservationId=@0`,
                [reservationId],
            );
            await relatedLastNo.commitTransaction();
            return lastNo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }

    async fetchFuelLevel() {
        const fetchFuelLevel = await this.tripDataSource.createQueryRunner();
        await fetchFuelLevel.connect();
        try {
            await fetchFuelLevel.startTransaction();
            const fuelLevel = await fetchFuelLevel.manager.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and (category_name=@1 or category_name=@2)`,
                ['ReservationTrip', 'FuelIN', 'FuelOut'],
            );
            await fetchFuelLevel.commitTransaction();
            return fuelLevel;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async driverService() {
        const driverService = await this.tripDataSource.createQueryRunner();
        await driverService.connect();
        try {
            await driverService.startTransaction();
            const serviceStatus = await driverService.manager.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`,
                ['ReservationTrip', 'DriverServiceStatus'],
            );
            await driverService.commitTransaction();
            return serviceStatus;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async tripStatus() {
        const tripStatusQuery = await this.tripDataSource.createQueryRunner();
        await tripStatusQuery.connect();
        try {
            await tripStatusQuery.startTransaction();
            const tripStatus = await tripStatusQuery.manager.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`,
                ['ReservationTrip', 'TripStatus'],
            );
            // console.log('helleo')
            await tripStatusQuery.commitTransaction();
            return tripStatus;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
        // throw new Error(`Failed to find booking type: ${e.message}`);\
    }

    async assignVehicle(model: string) {
        const assignVehicleQuery = await this.tripDataSource.createQueryRunner();
        await assignVehicleQuery.connect();
        try {
            await assignVehicleQuery.startTransaction();
            const vehicle = await assignVehicleQuery.manager.query(
                `select  * from _cplVehicles where vehicleModel=@0 order By vehicleRegNo`,
                [model],
            );
            // console.log('helleo')
            await assignVehicleQuery.commitTransaction();
            return vehicle;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
        // throw new Error(`Failed to find booking type: ${e.message}`);\
    }


    async assignReg(vehicleValidationDto: VehicleValidationDto) {
        const vehicle = new ReservationTripEntity(vehicleValidationDto)

        const { vehicleID, FromDateTime, ToDateTime } = vehicle;

        const assignRegQuery = this.tripDataSource.createQueryRunner();
        await assignRegQuery.connect();

        try {
            await assignRegQuery.startTransaction();

            // Validate if the vehicle is available in the given time range
            const myVehicle = await assignRegQuery.manager.query(
                `
SELECT * FROM _cplReservationTrips 
                 WHERE VehicleId = @0 
                 AND (
                     (FORMAT(FromDateTime, 'yyyy-MM-dd HH:mm') BETWEEN @1 AND @2)
                     OR (FORMAT(ToDateTime, 'yyyy-MM-dd HH:mm') BETWEEN @1 AND @2)
            )`,
                [vehicleID, FromDateTime, ToDateTime]
            );
// console.log(vehicleID,'MY VEHICLEID')
            // Continue with the assignment process if vehicle is available
            // Your logic to assign the vehicle here...

            await assignRegQuery.commitTransaction();
            // console.log('Validatee', myVehicle)
            return myVehicle;

        } catch (error) {
            await assignRegQuery.rollbackTransaction();
            throw new BadRequestException(error.message);
        } finally {
            await assignRegQuery.release();
        }
    }

    // select vehicleRegNo,vehicleID from _cplVehicles
    // where VehicleID=@2 and  vehicleStatus='ReadyToUse' 
    // and vehicleID not in ( select isnull(vehicleid,0) from _cplReservationTrips 
    // where (@0 between format(FromDateTime,'yyyy-MM-dd hh:mm') and format(ToDateTime,'yyyy-MM-dd hh:mm')
    // or @1 between format(FromDateTime,'yyyy-MM-dd hh:mm') and format(ToDateTime,'yyyy-MM-dd hh:mm'))
    // and (format(fromdatetime,'yyyy-MM-dd hh:mm') between @0 and @1
    // or format(todatetime,'yyyy-MM-dd hh:mm') between @0 and @1) )




    async assignDriver(driverValidationDto: DriverValidationDto) {
        const trip = new ReservationTripEntity(driverValidationDto);

        const { DriverId, DriverFirstName, FromDateTime, ToDateTime } = trip;

        const assignDriverQuery = this.tripDataSource.createQueryRunner();
        await assignDriverQuery.connect();

        try {
            await assignDriverQuery.startTransaction();

            const Driver = await assignDriverQuery.manager.query(
                `SELECT * FROM _cplReservationTrips 
                 WHERE DriverId = @0 
                 AND DriverFirstName = @3
                 AND (
                     (FORMAT(FromDateTime, 'yyyy-MM-dd HH:mm') BETWEEN @1 AND @2)
                     OR (FORMAT(ToDateTime, 'yyyy-MM-dd HH:mm') BETWEEN @1 AND @2)
                 )`,
                [DriverId, FromDateTime, ToDateTime, DriverFirstName]
            );
            await assignDriverQuery.commitTransaction();
            return Driver;
        } catch (e) {
            await assignDriverQuery.rollbackTransaction();
            throw new BadRequestException(e.message);
        } finally {
            await assignDriverQuery.release();
        }
    }




    async searchResources(searchResourcesDto: SearchResourcesDto) {
        const trip = this.tripDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();

            // Base query
            let query = `
                select * from _cplScheduled where 1=1
                     
            `;

            // Parameters array
            const parameters: any[] = [];
            const parameterNames: { [key: string]: number } = {};
            let paramCount = 1;

            // Adding dynamic conditions based on searchResourcesDto
            Object.keys(searchResourcesDto).forEach(key => {
                const value = searchResourcesDto[key];
                if (value) {
                    query += ` and ${key} = $${paramCount}`;
                    parameters.push(value);
                    parameterNames[key] = paramCount;
                    paramCount++;
                }
            });

            // Executing the query
            const tripInfo = await trip.query(query, parameters);

            await trip.commitTransaction();
            return tripInfo;
        } catch (e) {
            await trip.rollbackTransaction();
            throw new Error(`Failed to find trips: ${e.message}`);
        } finally {
            await trip.release();
        }
    }





    async searchReservation(searchParams: any): Promise<ReservationDetailsViewEntity[]> {
        const query = this.reservationDetailsRepo.createQueryBuilder('reservations');

        Object.keys(searchParams).forEach(key => {
            const value = searchParams[key];
            if (value) {
                if (key === 'FromDate' || key === 'ToDate') {
                    query.andWhere(`reservations.${key} BETWEEN :${key}Start AND :${key}End`, {
                        [`${key}Start`]: `${value} 00:00:00`,
                        [`${key}End`]: `${value} 23:59:59`,
                    });
                } else {
                    query.andWhere(`reservations.${key} LIKE :${key}`, { [`${key}`]: `%${value}%` });
                }
            }
        });

        return query.getMany();
    }


    async searchTripsSchedules(searchParams: any): Promise<ReservationDetailsViewEntity[]> {
        // Create a query builder for the ReservationDetailsViewEntity
        const query = this.reservationDetailsRepo.createQueryBuilder('reservations');

        // Iterate over the keys of the search parameters object
        Object.keys(searchParams).forEach(key => {
            const value = searchParams[key];

            if (value) {
                if (key === 'FromDate' || key === 'ToDate') {
                    // Handle date range queries
                    if (key === 'FromDate') {
                        query.andWhere('reservations.FromDateTime >= :FromDateStart', {
                            FromDateStart: `${value} 00:00:00`,
                        });
                    } else if (key === 'ToDate') {
                        query.andWhere('reservations.ToDateTime <= :ToDateEnd', {
                            ToDateEnd: `${value} 23:59:59`,
                        });
                    }
                } else {
                    // Handle other fields with LIKE query
                    query.andWhere(`reservations.${key} LIKE :${key}`, { [`${key}`]: `%${value}%` });
                }
            }
        });

        // Execute the query and return the results
        return query.getMany();
    }

}

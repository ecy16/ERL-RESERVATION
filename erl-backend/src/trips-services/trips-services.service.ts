import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TripServicesEntity } from '../entities/tripServices.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AddTripServicesDto } from '../dto/add-tripServices.dto';

@Injectable()
export class TripsServicesService {
    constructor(
        @InjectRepository(TripServicesEntity)
        private tripservicesRepo: Repository<TripServicesEntity>,
        private readonly tripservicesEntity: EntityManager,
        private readonly tripServiceDataSource: DataSource,
    ) {}

    async createTripService(addTripsServicesDto: AddTripServicesDto) {
        const tripServices = new TripServicesEntity(addTripsServicesDto);
        try {
            return await this.tripservicesEntity.save(tripServices);
        } catch (err) {
            throw new BadRequestException(
                `SOMETHING WENT WRONG: ${err.message}`,
            );
        }
    }
    async findAllTripsServices() {
        try {
            return await this.tripservicesRepo.find();
        } catch (err) {
            // console.log(err);
            throw new BadRequestException(err);
        }
    }

    findTripsService(id: number) {
        return this.tripservicesRepo.findOne({ where: { ServiceId: id } });
    }

    async updateTripService(id: number, attrs: Partial<TripServicesEntity>) {
        const services = await this.findTripsService(id);
        if (!services) {
            throw new NotFoundException('services not found');
        }
        Object.assign(services, attrs);
        return this.tripservicesRepo.save(services);
    }

    async findRelatedTripsService(reservationId: number) {
        const trip = this.tripServiceDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(
                `
              SELECT
    k.Description_1 AS serviceDesc,
    k.Code,
    m.TripNo
FROM
    _cplTripServices l
JOIN
    stkitem k ON l.serviceName = k.StockLink
JOIN
    _cplReservationTrips m ON l.TripId = m.TripId
WHERE
    l.reservationId = @0;

`,
                [reservationId],
            );
            await trip.commitTransaction();
            return tripInfo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }

    async fetchServiceStatus() {
        const serviceStatus =
            await this.tripServiceDataSource.createQueryRunner();
        await serviceStatus.connect();
        try {
            await serviceStatus.startTransaction();
            const status = await serviceStatus.manager.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1 `,
                ['TripServices', 'ServiceStatus'],
            );
            // console.log('helleo')
            await serviceStatus.commitTransaction();
            return status;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
        // throw new Error(`Failed to find booking type: ${e.message}`);\
    }

    async fetchSageServices(reservationId:number) {
        const sageService =
            await this.tripServiceDataSource.createQueryRunner();
        await sageService.connect();
        try {
            await sageService.startTransaction();
            const service = await sageService.manager.query(
                `  select
            k.Description_1 as serviceDesc1,k.Description_2 as serviceDesc, k.Code, @0 from 
                 stkitem k join  _etblStockDetails std on k.stocklink=std.stockid and whseid=0 where std.groupid=10
             `,
                [reservationId],
            );

            // select a.StockLink,a.Description_1,isnull(e.AverageCost,0)as AverageCost ,isnull(e.LatestCost,0) as LatestCost from StkItem a join _etblStockDetails b on a.StockLink=b.StockID
            // join _etblStockCategories c on b.ItemCategoryID = c.idStockCategories
            //          join GrpTbl d on b.GroupID= d.idGrpTbl
            //           left join _etblStockCosts e on a.StockLink=e.StockID
            // where c.cCategoryName=@0 and d.StGroup=@1
            // console.log('helleo')
           
            await sageService.commitTransaction();
            return service;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
        // throw new Error(`Failed to find booking type: ${e.message}`);\
    }

    async fetchSageServicesInfo(serviceName: string) {
        serviceName = serviceName.split('%20').join(' ');
        const sageRelatedService =
            await this.tripServiceDataSource.createQueryRunner();
        await sageRelatedService.connect();
        try {
            await sageRelatedService.startTransaction();
            const relatedService = await sageRelatedService.manager.query(
                `
                select a.StockLink,a.Code,a.Description_1,isnull(e.AverageCost,0)as AverageCost ,isnull(e.LatestCost,0) as LatestCost from StkItem a join _etblStockDetails b on a.StockLink=b.StockID
                join _etblStockCategories c on b.ItemCategoryID = c.idStockCategories
                         join GrpTbl d on b.GroupID= d.idGrpTbl
                          left join _etblStockCosts e on a.StockLink=e.StockID
                where c.cCategoryName=@0 and d.StGroup=@1  and a.StockLink=@2`,
                ['SelfDrivenServices', 'Reservations', serviceName],
            );
            // console.log('helleo')
            await sageRelatedService.commitTransaction();
            return relatedService;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async fetchTripServiceInfo(serviceId: number) {
        const tripService = this.tripServiceDataSource.createQueryRunner();
        await tripService.connect();
        try {
            await tripService.startTransaction();
            const tripServiceInfo = await tripService.query(
                `select  * from _cplTripServices where ServiceId=@0`,
                [serviceId],
            );
            await tripService.commitTransaction();
            return tripServiceInfo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
}

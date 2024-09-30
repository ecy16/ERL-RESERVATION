/* eslint-disable prettier/prettier */
import {

    BadRequestException,

    Injectable,

    NotFoundException,

} from '@nestjs/common';



import { DataSource, EntityManager, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { ReservationEntity } from '../entities/reservation.entity';

import { AddReservationDto } from '../dto/add-reservation.dto';
import { AddReservationPaymentsDto } from "../dto/add-reservationPayments.dto";
import { SearchReservationsDto } from 'src/dto/search-reservations.dto';
import { SearchResourcesDto } from 'src/dto/search-resources.dto';
import { Observable, catchError, from } from 'rxjs';

@Injectable()

export class ReservationsService {

    constructor(

        @InjectRepository(ReservationEntity)

        private reservationRepo: Repository<ReservationEntity>,

        private readonly reservationEntity: EntityManager,

        private readonly reservDataSource: DataSource,

    ) { }
    async findLastRec(Branch: string) {
        const lastRec = await this.reservDataSource.createQueryRunner();
        await lastRec.connect();
        try {
            await lastRec.startTransaction();
            const rec = await lastRec.query(
                `Declare @lastNo as int;
                Declare @lastID as int;
                set @lastID = (select count( ReservationId)
                from  _cplReservations a where a.Branch=@0
                )
                select format(cast(isnull(@lastID, 0) as int) + 1,'000#') as lastNo
                `, [Branch],
            );
            await lastRec.commitTransaction();
            return rec;
            // return (Branch);
        }
        catch (e) {
            throw new Error(`Failed to records: ${e.message}`);
        }
    }






    searchView(searchReservationsDto: SearchReservationsDto): Observable<ReservationEntity[]> {
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
        } else if (fromDate) {
            query.andWhere('reservation.BookingDate >= :fromDate', { fromDate });
        } else if (toDate) {
            query.andWhere('reservation.BookingDate <= :toDate', { toDate });
        }
        return from(query.getMany()).pipe(
            catchError(error => {
                throw new Error(`Failed to find any results: ${error.message}`);
            })
        );
    }

    async searchResources(SearchResourcesDto: SearchResourcesDto): Promise<ReservationEntity[]> {
        const query = this.reservationRepo.createQueryBuilder('reservation')
        Object.keys(SearchResourcesDto).forEach(key => {
            const value = SearchResourcesDto[key]
            if (value) {
                query.andWhere(`reservation.${key} = :${key}`, { [key]: value });
            }
        })
        try {
            const results = await query.getMany();
            return results;
        } catch (e) {
            throw new Error(`Failed to find any results: ${e.message}`);
        }

    }




    async createReservation(addReservationDto: AddReservationDto) {

        const reservation = new ReservationEntity(addReservationDto);
        const result = await this.fetchBookingRules(reservation.Branch);

        reservation.BookingNo = 'ERL-' + result[0].value + '-' + result[0].SequenceNo;

        // this.reservationEntity.create(reservation)

        try {

            return await this.reservationEntity.save(reservation);

        } catch (err) {

            throw new BadRequestException(err);

        }

    }


    async fetchBookingRules(Branch: string) {
        const bookingRulesQuery = await this.reservDataSource.createQueryRunner();
        await bookingRulesQuery.connect();
        try {
            await bookingRulesQuery.startTransaction();
            const bookingRules = await bookingRulesQuery.query(
                `
            select [value], format(case when count(b.Branch)  =0 then  [SequenceNo]  else count(b.Branch) +1 end,'000#') as [SequenceNo]
                from _cplAdminSettings a
                    left join _cplReservations b on a.[Control]=b.branch
                    where [Rule]='Branch' and a.[Control]=@0 group by [value],[SequenceNo]`, [Branch]
            );
            await bookingRulesQuery.commitTransaction();
            return bookingRules;
        }
        catch (e) {
            throw new Error(`Failed to find any records: ${e.message}`);
        }



    }

    // async createReservationNew(addReservationDto: AddReservationDto) {

    //     const reservation = new ReservationEntity(addReservationDto);



    //     // this.reservationEntity.create(reservation);

    //     try {

    //         return await this.reservationEntity.save(reservation);

    //     } catch (err) {

    //         throw new BadRequestException(err);

    //     }

    // }


    async findAllReservations() {
        const reservationsQuery = await this.reservDataSource.createQueryRunner();
        await reservationsQuery.connect();

        try {
            await reservationsQuery.startTransaction();

            const reservations = await reservationsQuery.query(`
            SELECT [ReservationId],
                   [BookingNo],
                   format(cast([BookingDate] as date), 'dd-MM-yyyy') as [BookingDate],
                   [BookingCategory],
                   [BookingType],
                   [Branch],
                   [BookingStatus],
                   [BookingFor],
                   [CompanyCode],
                   [companyName],
                   [PayeeCompanyName],
                   [Remarks],
                   [ChargeType],
                   [ChargeCurr],
                   [Source],
                   [SourceRefNo],
                   [ContractId],
                   [CreatedBy],
                   [ModifiedBy],
                   format([ModifiedOn], 'dd-MM-yyyy') as [ModifiedOn],
                   format([CreatedOn], 'dd-MM-yyyy HH:mm') as [CreatedOn]
            FROM [dbo].[_cplReservations]
            WHERE BookingDate = format(getdate(), 'yyyy-MM-dd')
            ORDER BY BookingDate ASC, CreatedOn ASC;
          `);

            await reservationsQuery.commitTransaction();

            return reservations;
        } catch (e) {
            throw new Error(`Failed to find any reservations: ${e.message}`);
        }
    }




    async findReservations(id: number) {

        return await this.reservationRepo.findOne({
            where: { ReservationId: id }
        });

    }

    async findReservationsById(reservationId: number) {
        const reservationsQuery = await this.reservDataSource.createQueryRunner();
        await reservationsQuery.connect();
        try {
            await reservationsQuery.startTransaction();
            const reservations = await reservationsQuery.query(
                `select *,case when BookingDate='' then '' else format(cast(BookingDate as date),'dd-MM-yyyy') end as ReservationDate from _cplReservations where ReservationId=@0 order by CreatedOn desc `, [reservationId],
            );
            await reservationsQuery.commitTransaction();
            return reservations;
        }
        catch (e) {
            throw new Error(`Failed to find any reservations: ${e.message}`);
        }

    }






    async updateReservation(id: number, attrs: Partial<ReservationEntity>) {

        const reservation = await this.findReservations(id);

        if (!reservation) {

            throw new NotFoundException('reservation not found');

        }

        Object.assign(reservation, attrs);

        return this.reservationRepo.save(reservation);

    }

    async findBookingCategory() {
        const fetchCategory = await this.reservDataSource.createQueryRunner();
        await fetchCategory.connect();
        try {
            await fetchCategory.startTransaction();
            const bookingCategory = await fetchCategory.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'BookingCategory'],
            );
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
            const bookingType = await fetchType.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'BookingType'],
            );
            // console.log('helleo')
            await fetchType.commitTransaction();
            return bookingType;
        }
        catch (e) {
            throw new BadRequestException(e.message)
        }
        // throw new Error(`Failed to find booking type: ${e.message}`);\

    }
    async findBookingBranch() {
        const fetchBranch = await this.reservDataSource.createQueryRunner();
        await fetchBranch.connect();
        try {
            await fetchBranch.startTransaction();
            const bookingBranch = await fetchBranch.query(
                `SELECT DISTINCT category_Options 
                FROM _cplItemMaster 
                WHERE item_Name = 'Reservation' 
                  AND category_name = 'Branch';`
            );
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
            const bookingStatus = await fetchStatus.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'BookingStatus'],
            );
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
            const BookingChargeType = await ChargeType.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'ChargeType'],
            );
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
            const bookingSource = await source.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1`, ['Reservation', 'Source'],
            );
            await source.commitTransaction();
            return bookingSource;
        }
        catch (e) {
            throw new Error(`Failed to find booking category: ${e.message}`);
        }

    }

    async AddBookingPaymentDetails(id, addReservationPaymentsDto: AddReservationPaymentsDto) {
        const reservationPayments = new ReservationEntity(addReservationPaymentsDto);
    }




}


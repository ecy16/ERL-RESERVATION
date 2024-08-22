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


    // async searchView(searchReservationsDto: SearchReservationsDto) {

    //     const reservationSearch = new ReservationEntity(searchReservationsDto);

    //     var BookingNo = reservationSearch.BookingNo;
    //     var fromDate = reservationSearch.CreatedOn;
    //     var toDate = reservationSearch.ModifiedOn;
    //     var BookingCategory = reservationSearch.BookingCategory;
    //     var BookingType = reservationSearch.BookingType;
    //     var BookingStatus = reservationSearch.BookingStatus;

    //     const searchQuery = await this.reservDataSource.createQueryRunner();
    //     await searchQuery.connect();
    //     try {
    //         await searchQuery.startTransaction();
    //         const results = await searchQuery.query(
    //             `select * from _cplReservations
    //             where BookingNo=@0 and BookingDate between fromDate and toDate and BookingCategory and BookingType and BookingStatus`, [BookingNo, fromDate, toDate, BookingCategory, BookingType, BookingStatus],
    //         );
    //         await searchQuery.commitTransaction();
    //         return results;
    //     }
    //     catch (e) {
    //         throw new Error(`Failed to find any results: ${e.message}`);
    //     }

    // }

    // async searchView(searchReservationsDto: SearchReservationsDto) {
    //     // Create a new instance of ReservationEntity from the DTO
    //     const reservationSearch = new ReservationEntity(searchReservationsDto);

    //     // Extract fields from the reservation search entity
    //     const { BookingNo, CreatedOn, ModifiedOn, BookingCategory, BookingType, BookingStatus, Branch } = reservationSearch;

    //     // Initialize the query runner
    //     const searchQuery = await this.reservDataSource.createQueryRunner();
    //     await searchQuery.connect();

    //     try {
    //         // Start a transaction
    //         await searchQuery.startTransaction();

    //         // Build the query dynamically
    //         let query = "SELECT * FROM _cplReservations WHERE BookingNo <>''";
    //         const queryParams = [];

    //         if (BookingNo) {
    //             query += " AND BookingNo = '@0'";
    //             queryParams.push(BookingNo);
    //         }
    //         // if (CreatedOn && ModifiedOn) {
    //         //     query += " AND BookingDate BETWEEN '@1' AND '@2'";
    //         //     queryParams.push(CreatedOn, ModifiedOn);
    //         // }
    //         // else if (CreatedOn) {
    //         //     query += " AND BookingDate >= ?";
    //         //     queryParams.push(CreatedOn);
    //         // } else if (ModifiedOn) {
    //         //     query += " AND BookingDate <= ?";
    //         //     queryParams.push(ModifiedOn);
    //         // }
    //         if (BookingCategory) {
    //             query += " AND BookingCategory = '@1'";
    //             queryParams.push(BookingCategory);
    //         }
    //         if (BookingType) {
    //             query += " AND BookingType = '@2'";
    //             queryParams.push(BookingType);
    //         }
    //         if (BookingStatus) {
    //             query += " AND BookingStatus = '@3'";
    //             queryParams.push(BookingStatus);
    //         }
    //         if (Branch) {
    //             query += " AND Branch = '@4'";
    //             queryParams.push(Branch);
    //         }

    //         // Execute the query
    //         const results = await searchQuery.query(query, queryParams);

    //         // Commit the transaction
    //         await searchQuery.commitTransaction();

    //         // Return the results
    //         // return query +'_______________________________'+ queryParams;
    //         return results
    //     } catch (e) {
    //         // Rollback the transaction in case of an error
    //         await searchQuery.rollbackTransaction();
    //         throw new Error(`Failed to find any results: ${e.message}`);
    //     } finally {
    //         // Release the query runner
    //         await searchQuery.release();
    //     }
    // }




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

    // async createReservation(addReservationDto: AddReservationDto) {


    //     const reservation = new ReservationEntity(addReservationDto);
    //     const lastID = await this.findLastRec(reservation.Branch);

    //     let branch_abv = '';
    //     switch (reservation.Branch) {
    //         case 'HeadQuarters':
    //             branch_abv = 'HQ'
    //             break;
    //         case 'Mombasa':
    //             branch_abv = 'MSA'
    //             break;
    //         case 'Nanyuki':
    //             branch_abv = 'NYK'
    //             break;
    //         case 'Kisumu':
    //             branch_abv = 'KSM'
    //             break;
    //         default:
    //             branch_abv = reservation.Branch
    //             break;
    //     }
    //     reservation.BookingNo = 'ERL-' + branch_abv + '-' + lastID[0].lastNo;

    //     // this.reservationEntity.create(reservation);

    //     try {

    //         return await this.reservationEntity.save(reservation);

    //     } catch (err) {

    //         throw new BadRequestException(err);
    //     }

    // }


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
            const reservations = await reservationsQuery.query(
                `
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
                  FROM  [dbo].[_cplReservations] where  BookingDate = format(getdate(),'yyyy-MM-dd') order by CreatedOn desc `,
            );
            await reservationsQuery.commitTransaction();
            return reservations;
        }
        catch (e) {
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


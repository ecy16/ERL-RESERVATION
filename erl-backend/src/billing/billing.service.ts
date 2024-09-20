import { Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { BillingEntity } from 'src/entities/billing.entity';

@Injectable()
export class BillingService {



  constructor(

    @InjectRepository(BillingEntity)

    private billingRepo: Repository<BillingEntity>,

    private readonly BillingEntity: EntityManager,

    private readonly BillingDataSource: DataSource,

  ) { }

  create(createBillingDto: CreateBillingDto) {
    return 'This action adds a new billing';
  }

  findAll() {
    return `This action returns all billing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billing`;
  }

  update(id: number, updateBillingDto: UpdateBillingDto) {
    return `This action updates a #${id} billing`;
  }

  remove(id: number) {
    return `This action removes a #${id} billing`;
  }

  async findAllBillings() {


    const billsQuery = await this.BillingDataSource.createQueryRunner();
    await billsQuery.connect();
    try {
      await billsQuery.startTransaction();
      const bills = await billsQuery.query(
        `
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
                  FROM  [dbo].[_cplReservations] a left join _cplContracts b on a.ContractId = b.ContractId `,
      );
      await billsQuery.commitTransaction();
      return bills;
    }
    catch (e) {
      throw new Error(`Failed to find any bills: ${e.message}`);
    }


  }

  async FindBillDetailsById(reservationId: number) {



    const billsQuery = await this.BillingDataSource.createQueryRunner();
    await billsQuery.connect();
    try {
      await billsQuery.startTransaction();
      const bills = await billsQuery.query(
        ` SELECT 
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
          `, [reservationId]
      );
      await billsQuery.commitTransaction();
      return bills;
    }
    catch (e) {
      throw new Error(`Failed to find any bills: ${e.message}`);
    }


  }


  async FetchBillDetailsById(reservationId: number) {



    const billsQuery = await this.BillingDataSource.createQueryRunner();
    await billsQuery.connect();
    // try {
    //   await billsQuery.startTransaction();
    //   const bills = await billsQuery.query(
    //     ` exec _cplBillingInfo @bookingID = @0;
    //       `, [reservationId]
    //   );
    //   await billsQuery.commitTransaction();
    //   return JSON.parse(bills[0].responseJson);
    // }
    // catch (e) {
    //   throw new Error(`Failed to find any bills: ${e.message}`);
    // }

  }



//   async fetchBillDetailsByTripId(tripId: number) {



//     const billsQuery = await this.BillingDataSource.createQueryRunner();
//     await billsQuery.connect();
//     try {
//       await billsQuery.startTransaction();
//       const bills = await billsQuery.query(
//         ` select
// * from  _cplReservationTrips a  --left join _cplContracts c  on b.ContractId=c.ContractId
// left join _cplTripServices d on a.TripId = d.TripId left join _cplVehicles f on a.VehicleId = f.vehicleID
// left join _cplChaufferDrivers g on a.DriverId = g.DriverId where a.TripId=@0;
//         `, [tripId]
//       );
//       await billsQuery.commitTransaction();
//       return bills;
//     }
//     catch (e) {
//       throw new Error(`Failed to find any bills: ${e.message}`);
//     }


//   }
}



// <---------All trip details query------------>
// select
// *from _cplReservationTrips a inner join _cplReservations b on a.ReservationId = b.ReservationId left join _cplContracts c  on b.ContractId=c.ContractId
// left join _cplTripServices d on a.TripId = d.TripId join _cplVehicles f on a.VehicleId = f.vehicleID
// left join _cplChaufferDrivers g on a.DriverId = g.DriverId where b.ReservationId=@0








// <0-------->
// <p>{{ tripService.Description }}</p>
// <p class="text-md text-gray-600">TripNo: {{ tripService.TripNo }}</p>
// <p class="text-md text-gray-600">serviceName: {{ tripService.serviceName }}</p>
// <p class="text-md text-gray-600">ServiceId: {{ tripService.ServiceId }}</p>
// <p class="text-md text-gray-600">TripCharge: {{ tripService.TripCharge }}</p>
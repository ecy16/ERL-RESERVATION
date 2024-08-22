import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ReservationDocumentsService {


    constructor(
        private readonly documentsDataSource:DataSource
    ){
    }
async fetchRentalAgreement(reservationId:number){

const Agreement= await this.documentsDataSource.createQueryRunner()
Agreement.connect()
try{
    await Agreement.startTransaction();
    const RentalAgreement = await Agreement.manager.query(
        `select distinct d.DriverFirstName + ' '+d.DriverLastName as username,a.Branch,a.BookingNo ,d.ContactNo ,d.Email, 
        d.AddressLine1 +' '+d.AddressLine2 +' ' +d.AddressLine3 as 'address',d.DriverDOB,d.IDPP,d.CountryOfIssue,
        d.DriverLicenseNo,d.DriverLicenseIssue,d.DriverLicenseExpiry,e.VehicleModel,e.vehicleRegNo from _cplReservations a 
        join _cplReservationTrips b on a.ReservationId = b.ReservationId  join _cplTripServices c on b.ReservationId = c.ReservationId 
        join _cplSelfDrivers d on c.ReservationId=d.ReservationId left join _cplVehicles e on b.VehicleId=e.vehicleID where a.ReservationId=@0`,
        [reservationId],
    );
    // console.log('helleo')
    await Agreement.commitTransaction();
    return RentalAgreement;
} catch (e) {
    throw new BadRequestException(e.message);
}
}
}


    


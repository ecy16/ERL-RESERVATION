import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsOptional } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {


    @IsOptional()
    TransactionId: number;
    @IsOptional()
    TripId: number;
    @IsOptional()
    ReservationId: number;
    @IsOptional()
    DriverId: number;
    @IsOptional()
    DriverFirstName: string;
    @IsOptional()
    vehicleID: number;
    @IsOptional()
    TripStatus: string;
    @IsOptional()
    MileageIN: number;
    @IsOptional()
    MileageOUT: number;
    @IsOptional()
    FuelIN: number;
    @IsOptional()
    FuelOUT: number;
    @IsOptional()
    tripNumber: number=1;
    @IsOptional()
    vehicleRegNo: string;
    @IsOptional()
    VehicleMake: string;
    @IsOptional()
    VehicleModel: string;
    @IsOptional()
    Destination : string;
    @IsOptional()
    Time: number;
    @IsOptional()
    DeliveredBy: string;
    @IsOptional()
    CollectedBy: string;
    @IsOptional()
    IncidentsType: string;
    @IsOptional()
    IncidentDate: string;
    @IsOptional()
    Remarks: string;
    @IsOptional()
    ReportedBy: string;
    @IsOptional()
    BookingFor: string;
    @IsOptional()
    PickupContactNo: string;
    @IsOptional()
    PickupEmail: string;
    @IsOptional()
    Collection: string;
    @IsOptional()
    Transaction: string;
    @IsOptional()
    PickupAddress: string;
    @IsOptional()
    FromDate: string;
    @IsOptional()
    FromTime: string;
    @IsOptional()
    @IsOptional()
    FromDateTime: string;
    @IsOptional()
    ToDateTime: string;
    @IsOptional()
    DropAddress: string;
    @IsOptional()
    BookingCategory: string;
    @IsOptional()
    PickupName: string;
    @IsOptional()
    TripFromDateTime: string;
    @IsOptional()
    ArrivalFlightDateTime: string;
    @IsOptional()
    ArrivalFlightNo: string;
    @IsOptional()
    DepartureFlightDateTime: string;
    @IsOptional()
    DepartureFlightNo: string;
    @IsOptional()
    TripToDateTime: string;
    @IsOptional()
    BookingStatus: string;
    @IsOptional()
    Branch: string;
    @IsOptional()
    BookingType: string;
    @IsOptional()
    Source: string;
    @IsOptional()
    companyName: string;
    @IsOptional()
    DriverName: string;
    


}

import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsOptional } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {



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
    BookingNo: string;
    @IsOptional()
    BookingCategory: string;
    


}

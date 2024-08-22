import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTripDto {
    @IsOptional()
    ReservationId: number;
    @IsOptional()
    DriverId: number;
    @IsOptional()
    DriverServiceStatus: string;
    @IsOptional()
    DriverRemarks: string;
    @IsOptional()
    VehicleId: number;
    @IsOptional()
    TripStatus: string;
    @IsOptional()
    VehicleRemarks: string;
    @IsOptional()
    FromDateTime: string;
    @IsOptional()
    ToDateTime: string;
    @IsOptional()
    FlightNo: string;
    @IsOptional()
    Airline: string;
    @IsOptional()
    FlightDateTime: string;
    @IsOptional()
    PickupAddress: string;
    @IsOptional()
    PickupContactNo: string;
    @IsOptional()
    PickupEmail: string;
    @IsOptional()
    //
    DropAddress: string;
    @IsOptional()
    RouteCode: string;
    @IsOptional()
    ReqVehicleType: string;
    @IsOptional()
    MileageCap: number;
    @IsOptional()
    MileageIN: number;
    @IsOptional()
    MileageOUT: number;
    @IsOptional()
    FuelIN: number;
    @IsOptional()
    FuelOUT: number;
    @IsOptional()
    CheckOUTBy: string;
    @IsOptional()
    CheckInBy: string;
    @IsOptional()
    //
    ModifiedBy: string;
    @IsOptional()
    //
    ModifiedOn: string;
    @IsOptional()
    TripNo: number;
    @IsOptional()
    FlightDate: string;
    @IsOptional()
    tripFuelLevel: string;
       @IsOptional()
    BookingNo: string;
    @IsOptional()
    TripId: number;
    @IsOptional()
    VehicleMake: string;
    @IsOptional()
    VehicleModel: string;
    @IsOptional()
    vehicleRegistration: string;
    @IsOptional()
    vehicleType: string;
    @IsOptional()
    DriverFirstName: string;
    @IsOptional()
    BookingCategory: string;
    @IsOptional()
    PickupName: string;
    @IsOptional()
    BookingFor: string;
    @IsOptional()
    vehicleRegNo: string;
    @IsOptional()
    vehicleID: string;
}

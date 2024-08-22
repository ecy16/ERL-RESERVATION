import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddTripDto {
    // @IsNumber()
    @IsOptional()
    ReservationId: number;
    @IsOptional()
    TripNo: number;
    // // @IsNumber()
    @IsOptional()
    DriverId: number;
    //@IsString()
    @IsOptional()
    DriverServiceStatus: string;
    //@IsString()
    @IsOptional()
    DriverRemarks: string;
    // @IsNumber()
    @IsOptional()
    VehicleId: number;
    //@IsString()
    @IsOptional()
    TripStatus: string;
    //@IsString()
    @IsOptional()
    VehicleMarks: string;
    //@IsString()
    //@IsString()
    @IsOptional()
    FromDateTime: string;
    //@IsString()
    @IsOptional()
    ToDateTime: string;
    //@IsString()
    @IsOptional()
    FlightNo: string;
    //@IsString()
    @IsOptional()
    Airline: string;
    //@IsString()
    @IsOptional()
    FlightDateTime: string;
    //@IsString()
    @IsOptional()
    PickupAddress: string;
    //@IsString()
    @IsOptional()
    PickupContactNo: string;
    //@IsString()
    @IsOptional()
    PickupEmail: string;
    //@IsString()
    @IsOptional()
    DropAddress: string;
    //@IsString()
    @IsOptional()
    RouteCode: string;
    //@IsString()
    @IsOptional()
    ReqVehicleType: string;
    // @IsNumber()
    @IsOptional()
    MileageCap: number;
    // @IsNumber()
    @IsOptional()
    MileageIN: number;
    // @IsNumber()
    @IsOptional()
    MileageOUT: number;
    // @IsNumber()
    @IsOptional()
    FuelIN: number;
    // @IsNumber()
    @IsOptional()
    FuelOUT: number;
    //@IsString()
    @IsOptional()
    CheckOUTBy: string;
    //@IsString()
    @IsOptional()
    CheckInBy: string;
    //@IsString()
    @IsOptional()
    CreatedBy: string;
    //@IsString()
    @IsOptional()
    CreatedOn: string;
    // @IsNotEmpty()
    // reservationReservationId: number;
    @IsOptional()
    FirstName: string;
    @IsOptional()
    LastName: string;
    @IsOptional()
    tripFuelLevel: string;
  
    @IsOptional()
    tripNumber: string;
    @IsOptional()
    VehicleMake: string;
    @IsOptional()
    VehicleModel: string;
    @IsOptional()
    vehicleRegistration: string;
    @IsOptional()
    vehicleType: string;
    @IsOptional()
    PickupFirstName: string;
    @IsOptional()
    PickupLastName: string;
    @IsOptional()
    PickupName: string;
}

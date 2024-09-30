import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddTripDto {
    // @IsNumber()
    @IsOptional()
    ReservationId: number;
    // @IsOptional()
    // TripNo: number;
    // // @IsNumber()
    @IsOptional()
    DriverId: number;
    @IsOptional()
    BookingNo: string;
    @IsOptional()
    DriverFirstName: string;
    @IsOptional()
    VehicleRemarks: string;
    @IsOptional()
    CheckINBy: string;
    @IsOptional()
    ModifiedBy: string;
    @IsOptional()
    ModifiedOn: string;
    @IsOptional()
    Transaction: string;

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
    @IsString()    
    FromDateTime: string; 

    @IsOptional()
    @IsString()    
    ToDateTime: string;
    //@IsString()
    @IsOptional()
    FlightNo: string;
    //@IsString()
    @IsOptional()
    Airline: string;
    //@IsString()
    @IsOptional()
    ArrivalFlightDateTime: string;
    @IsOptional()
    DepartureFlightDateTime: string;
    @IsOptional()
    DepartureFlightNo: string;
    @IsOptional()
    ArrivalFlightNo: string;
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
    tripNumber: number = 1;
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
    @IsOptional()
    Remarks: string;
    @IsOptional()
    vehicleID: number;

    @IsOptional()
    TripCategory: string; // Added trip category field

    @IsOptional()
    TripSubCategory: string;
}

function parseDate(dateString: string): Date {
    const [day, month, yearAndTime] = dateString.split('-');
    const [year, time] = yearAndTime.split(' ');

    const [hours, minutes] = time.split(':');


    return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes)
    );
}
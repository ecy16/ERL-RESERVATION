/// <reference types="multer" />
export declare class AddVehicleDto {
    vehicleRegNo: string;
    vehicleDescription: string;
    commissionDate: string;
    vehicleOwner: string;
    chassisNumber: string;
    vehicleStatus: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleColor: string;
    engineCapacity: string;
    vehicleType: string;
    vehicleTransmission: string;
    inspectionDueDate: string;
    insuranceDueDate: string;
    psvDueDate: string;
    remarks: string;
    lastServiceDone: string;
    lastOdometerReading: number;
    CreatedBy: string;
    CreatedOn: string;
    image: Express.Multer.File;
    document: Express.Multer.File;
}

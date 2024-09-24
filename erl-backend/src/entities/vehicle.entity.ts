import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity('_cplVehicles')
// @Unique(['chassisNumber'])
// @Unique(['vehicleRegNo'])
export class VehiclesEntity {
    @PrimaryGeneratedColumn()
    vehicleID: number;
    @Column({ nullable: true })
    vehicleRegNo: string;
    @Column({ nullable: true })
    vehicleDescription: string;
    @Column({ nullable: true })
    commissionDate: string;
    @Column({ nullable: true })
    vehicleOwner: string;
    @Column({ nullable: true })
    chassisNumber: string;
    @Column({ nullable: true })
    vehicleStatus: string;
    @Column({ nullable: true })
    VehicleMake: string;
    @Column({ nullable: true })
    VehicleModel: string;
    @Column({ nullable: true })
    vehicleColor: string;
    @Column({ nullable: true })
    engineCapacity: string;
    @Column({ nullable: true })
    vehicleType: string;
    @Column({ nullable: true })
    seatCapacity: string;
    @Column({ nullable: true })
    vehicleFuel: string;
    @Column({ nullable: true })
    vehicleTransmission: string;
    @Column({ nullable: true })
    engineNo: string;
    @Column({ nullable: true })
    inspectionDueDate: string;
    @Column({ nullable: true })
    insuranceDueDate: string;
    @Column({ nullable: true })
    psvDueDate: string;
    @Column({ nullable: true })
    remarks: string;
    @Column({ nullable: true })
    lastServiceDone: string;
    @Column({ nullable: true })
    lastOdometerReading: number;
    @Column({ nullable: true })
    CreatedBy: string;
    @Column({ nullable: true })
    CreatedOn: string;
    @Column({ nullable: true })
    ModifiedBy: string;
    @Column({ nullable: true })
    ModifiedOn: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    document: string;

    constructor(partial: Partial<VehiclesEntity>) {
        Object.assign(this, partial);
    }
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('_cplSelfDrivers')
export class SelfDriversEntity {
    @PrimaryGeneratedColumn()
    BookingDriverId: number;
    @Column({ nullable: true })
    ReservationId: number;
    @Column({ nullable: true })
    DriverFirstName: string;
    @Column({ nullable: true })
    DriverLastName: string;
    @Column({ type: 'date', nullable: true })
    DriverDOB: Date;
    @Column({ nullable: true })
    DriverLicenseNo: string;
    @Column({ nullable: true })
    DriverLicenseIssue: string;
    @Column({ nullable: true })
    DriverLicenseExpiry: string;
    @Column({ nullable: true })
    Nationality: string;
    @Column({ nullable: true })
    IDPP: string;
    @Column({ nullable: true })
    IDPPExpiry: string;
    @Column({ nullable: true })
    CountryOfIssue: string;
    @Column({ nullable: true })
    CountryOfResidence: string;
    @Column({ nullable: true })
    AddressLine1: string;
    @Column({ nullable: true })
    AddressLine2: string;
    @Column({ nullable: true })
    AddressLine3: string;
    @Column({ nullable: true })
    ContactNo: string;
    @Column({ nullable: true })
    Email: string;
    @Column({ nullable: true })
    NextOfKinName: string;
    @Column({ nullable: true })
    NextofKinContactNo: string;
    @Column({ nullable: true })
    Source: string;
    @Column({ nullable: true })
    SourceRefNo: string;
    @Column({ nullable: true })
    Extras: string;
    @Column({ nullable: true })
    BookingRemarks: string;
    @Column({ nullable: true })
    CreatedBy: string;
    @Column({ nullable: true })
    CreatedOn: string;
    @Column({ nullable: true })
    ModifiedBy: string;
    @Column({ nullable: true })
    ModifiedOn: string;

    constructor(selfDrivers: Partial<SelfDriversEntity>) {
        Object.assign(this, selfDrivers);
    }
}

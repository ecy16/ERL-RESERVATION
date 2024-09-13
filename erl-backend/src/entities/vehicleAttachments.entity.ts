import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class VehicleAttachmentsEntity {
    @PrimaryGeneratedColumn()
    AttachmentId: number;
    @Column({ nullable: true })
    VehicleId: number;
    @Column({ nullable: true })
    DocId: number;
    @Column({ nullable: true })
    CreatedBy: string;
    @Column({ nullable: true })
    CreatedOn: Date;
    @Column({ nullable: true })
    ModifiedBy: string;
    @Column({ nullable: true })
    ModifiedOn: string;

    constructor(vehicleAttachments: Partial<VehicleAttachmentsEntity>) {
        Object.assign(this, vehicleAttachments);
    }
}

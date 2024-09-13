import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';

@Entity('_cplContractDetails')



export class ContractDetailEntity {
    @PrimaryGeneratedColumn()
    ContractDetailsId: number;
    @Column({ nullable: true })
    ContractId: number;
    @Column({ nullable: true })
    ContractDetailNo: number;
    @Column()
    status: string;
    @Column()
    BookingType: string;
    @Column()
    vehicleType: string;
    @Column()
    Transmission: string;
    @Column()
    NoOfVehicles: string;
    @Column()
    ServiceFromDate: string;
    @Column()
    ServiceToDate: string;
    @Column()
    ChargeType: string;
    @Column()
    ChargeAmount: string;
    @Column()
    ChargeCurr: string;
    @Column()
    frequency: string;
    @Column({ nullable: true })
    interval: string;

    constructor(contractDetail: Partial<ContractDetailEntity>) {
        Object.assign(this, contractDetail);
    }


}

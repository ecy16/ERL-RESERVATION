import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index, Unique } from 'typeorm';

@Entity('_cplContracts')

// @Unique(['ContractNo'])

@Index(['ContractNo', 'companyName'], { unique: true })

export class ContractEntity {

    @PrimaryGeneratedColumn()
    ContractId: number;
    @Column({ nullable: true, unique: true })
    ContractNo: string;
    @Column({nullable:true})
    companyName: string;
    @Column({ nullable: true })
    CompanyCode: string;
    @Column({ nullable: true })
    status: string;
    @Column()
    StartDate: string;
    @Column()
    EndDate: string;
    @Column()
    BillingDay: string;


    constructor(contracts: Partial<ContractEntity>) {
        Object.assign(this, contracts);
    }


}

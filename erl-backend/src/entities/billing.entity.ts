import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BillingEntity {

    @PrimaryGeneratedColumn()
    BillingId: number;
   

    constructor(billings: Partial<BillingEntity>) {
        Object.assign(this, billings);
    }
}

import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class RouterMasterEntity {
    @PrimaryGeneratedColumn()
    RouteId: number;
    @Column()
    RouteCode: string;
    @Column()
    RouteDescription: string;
    @Column()
    Mileage: string;
    @Column()
    CreatedBy: string;
    @Column()
    CreatedOn: string;
    @Column()
    ModifiedBy: string;
    @Column()
    ModifiedOn: string;
}

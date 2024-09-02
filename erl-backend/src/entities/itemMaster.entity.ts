import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('_cplItemMaster')
export class ItemMasterEntity {
    @PrimaryGeneratedColumn()
    Item_ID: number;
    @Column({ nullable: true })
    item_Name: string;
    @Column({ nullable: true })
    category_Name: string;
    @Column({ nullable: true })
    category_Options: string;
    @Column({ nullable: true })
    category_Options_1: string;
    @Column({ nullable: true })
    category_Options_2: string;
    @Column({ nullable: true })
    CreatedBy: string;
    @Column({ nullable: true })
    CreatedOn: string;
    @Column({ nullable: true })
    ModifiedBy: string;
    @Column({ nullable: true })
    ModifiedOn: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('_cplDocAttachments')
export class DocAttachmentsEntity {
    @PrimaryGeneratedColumn()
    DocId: number;
    @Column({ nullable: true })
    DocPath: string;
    @Column({ nullable: true })
    DocFolder: string;
    @Column({ nullable: true })
    DocName: string;
    @Column({ nullable: true })
    CreatedBy: string;
    @Column({ nullable: true })
    CreatedOn: Date;
    @Column({ nullable: true })
    ModifiedBy: string;
    @Column({ nullable: true })
    ModifiedOn: string;

    constructor(attachments: Partial<DocAttachmentsEntity>) {
        Object.assign(this, attachments);
    }
}

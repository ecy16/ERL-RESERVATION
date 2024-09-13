import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DocAttachmentsEntity } from './docAttachments.entity';
@Entity('ChaufDriveDocs')
export class ChaufDriveDocs {
  @PrimaryGeneratedColumn()
  ChaufDriveDocId: number;

  @ManyToOne(() => DocAttachmentsEntity, (doc) => doc.DocId)
  @JoinColumn({ name: 'DocId' })
  DocId: number;

  @Column()
  BookingId: number;

  @Column({ type: 'varchar', length: 50 })
  CreatedBy: string;

  @CreateDateColumn()
  CreatedOn: Date;

  @Column({ type: 'varchar', length: 50 })
  ModifiedBy: string;

  @UpdateDateColumn()
  ModifiedOn: Date;
}

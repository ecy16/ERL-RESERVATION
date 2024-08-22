import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DocAttachmentsEntity} from './docAttachments.entity';
import { SelfDriversEntity } from './selfDrivers.entity';
@Entity('_cplReservationDocs')
export class ReservationDocsEntity {
  @PrimaryGeneratedColumn()
  ReservationDocId: number;

  @ManyToOne(() => DocAttachmentsEntity)
  @JoinColumn({ name: 'DocId' })
  doc: DocAttachmentsEntity;

  @ManyToOne(() => SelfDriversEntity)
  @JoinColumn({ name: 'BookingId' })
  booking: SelfDriversEntity;

  @Column({ length: 50 })
  CreatedBy: string;

  @Column()
  CreatedOn: Date;

  @Column({ length: 50, nullable: true })
  ModifiedBy?: string;

  @Column({ nullable: true })
  ModifiedOn?: Date;
}

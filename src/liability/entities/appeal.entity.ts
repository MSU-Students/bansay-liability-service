import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AppealStatus } from '../enums/appeal-status.enum';
import { Liability } from './liability.entity';

@Entity('appeals')
export class Appeal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'liability_id' })
  liabilityId: number;

  @ManyToOne(() => Liability, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'liability_id' })
  liability: Liability;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ type: 'text' })
  reason: string;

  @Column({ name: 'evidence_url', nullable: true })
  evidenceUrl: string;

  @Column({
    type: 'enum',
    enum: AppealStatus,
    enumName: 'appeal_status_enum',
    default: AppealStatus.PENDING,
  })
  status: AppealStatus;

  @Column({ name: 'reviewer_remarks', nullable: true })
  reviewerRemarks: string;

  @Column({ name: 'reviewed_by', nullable: true })
  reviewedBy: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt: Date;
}

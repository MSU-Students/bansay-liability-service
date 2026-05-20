import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { LiabilityType } from '../enums/liability-type.enum';
import { LiabilityStatus } from '../enums/liability-status.enum';

@Entity('liabilities')
export class Liability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'issuer_id' })
  issuerId: number;

  @Column({ type: 'enum', enum: LiabilityType, enumName: 'liability_type_enum', default: LiabilityType.FINE })
  type: LiabilityType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: LiabilityStatus, enumName: 'liability_status_enum', default: LiabilityStatus.UNPAID })
  status: LiabilityStatus;

  @Column({ type: 'date', name: 'due_date' })
  dueDate: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', select: false })
  deletedAt: Date;
}

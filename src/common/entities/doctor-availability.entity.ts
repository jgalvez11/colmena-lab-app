import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class DoctorAvailability {
  @PrimaryGeneratedColumn({ name: 'availability_id' })
  availabilityId: number;

  @Column({ name: 'doctor_id' })
  doctorId: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => Doctor, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;
}

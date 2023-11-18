import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Patient } from './patient.entity';
import { EAppointmentStatus } from '../enums/appointment-status.enum';
import { Doctor } from './doctor.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn({ name: 'appointment_id' })
  appointmentId: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({
    type: 'enum',
    enum: EAppointmentStatus,
    default: EAppointmentStatus.PROGRAMMED
  })
  status: EAppointmentStatus;

  @Column({ name: 'patient_id' })
  patientId: number;

  @Column({ name: 'doctor_id' })
  doctorId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Patient, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Doctor, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;
}

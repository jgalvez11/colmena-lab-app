import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Appointment } from './appointment.entity.js';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn({ name: 'doctor_id' })
  doctorId: number;

  @Column({ unique: true, length: 20 })
  identification: string;

  @Column({ name: 'first_name', length: 90 })
  firstName: string;

  @Column({ name: 'last_name', length: 90 })
  lastName: string;

  @Column({ length: 200 })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 90 })
  city: string;

  @Column({ default: true })
  active: boolean;

  @Column({ name: 'professional_card_number', length: 20 })
  professionalCardNumber: string;

  @Column({ name: 'admission_date', type: 'timestamp' })
  admissionDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.patientId)
  appointments: Appointment[];
}

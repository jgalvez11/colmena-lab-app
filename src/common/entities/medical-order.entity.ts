import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Specialty } from './specialty.entity';
import { Appointment } from './appointment.entity';
import { MedicalOrderMedicine } from './medical-order-medicine.entity';

@Entity()
export class MedicalOrder {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  orderId: number;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'timestamp', name: 'expiration_date' })
  expirationDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Specialty, { eager: true })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;

  @ManyToOne(() => Appointment, { eager: true })
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @OneToMany(() => MedicalOrderMedicine, (relation) => relation.order, {
    eager: true
  })
  medicalOrderMedicines: MedicalOrderMedicine[];
}

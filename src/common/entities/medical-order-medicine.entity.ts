import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { MedicalOrder } from './medical-order.entity';
import { Medicine } from './medicine.entity';

@Entity()
export class MedicalOrderMedicine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MedicalOrder, (order) => order.medicalOrderMedicines)
  @JoinColumn({ name: 'order_id' })
  order: MedicalOrder;

  @ManyToOne(() => Medicine, (medicine) => medicine.medicalOrderMedicines, {
    eager: true
  })
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}

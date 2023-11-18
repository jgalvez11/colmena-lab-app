import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MedicalOrderMedicine } from './medical-order-medicine.entity';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn({ name: 'medicine_id' })
  medicineId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @OneToMany(() => MedicalOrderMedicine, (relation) => relation.medicine)
  medicalOrderMedicines: MedicalOrderMedicine[];
}

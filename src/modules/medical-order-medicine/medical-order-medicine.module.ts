import { Module } from '@nestjs/common';
import { MedicalOrderMedicineService } from './service/medical-order-medicine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalOrderMedicine } from 'src/common/entities/medical-order-medicine.entity';
import { MedicineModule } from '../medicine/medicine.module';
import { MedicalOrderMedicineController } from './controller/medical-order-medicine.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalOrderMedicine]), MedicineModule],
  providers: [MedicalOrderMedicineService],
  exports: [TypeOrmModule, MedicalOrderMedicineService],
  controllers: [MedicalOrderMedicineController]
})
export class MedicalOrderMedicineModule {}

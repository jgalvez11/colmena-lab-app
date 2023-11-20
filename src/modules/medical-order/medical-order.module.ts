import { Module } from '@nestjs/common';
import { MedicalOrderController } from './controller/medical-order.controller';
import { MedicalOrderService } from './service/medical-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalOrder } from '../../common/entities/medical-order.entity';
import { AppointmentModule } from '../appointment/appointment.module';
import { MedicalOrderMedicineModule } from '../medical-order-medicine/medical-order-medicine.module';
import { SpecialtyModule } from '../specialty/specialty.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalOrder]),
    AppointmentModule,
    SpecialtyModule,
    MedicalOrderMedicineModule
  ],
  controllers: [MedicalOrderController],
  providers: [MedicalOrderService, DataSource],
  exports: [TypeOrmModule, MedicalOrderService]
})
export class MedicalOrderModule {}

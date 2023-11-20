import { Module } from '@nestjs/common';
import { MedicalOrderController } from './controller/medical-order.controller';
import { MedicalOrderService } from './service/medical-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalOrder } from '../../common/entities/medical-order.entity';
import { AppointmentModule } from '../appointment/appointment.module';
import { MedicalOrderMedicineModule } from '../medical-order-medicine/medical-order-medicine.module';
import { SpecialtyModule } from '../specialty/specialty.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalOrder]),
    AppointmentModule,
    SpecialtyModule,
    MedicalOrderMedicineModule
  ],
  controllers: [MedicalOrderController],
  providers: [MedicalOrderService],
  exports: [TypeOrmModule, MedicalOrderService]
})
export class MedicalOrderModule {}

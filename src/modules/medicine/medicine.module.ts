import { Module } from '@nestjs/common';
import { MedicineController } from './controller/medicine.controller';
import { MedicineService } from './service/medicine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from 'src/common/entities/medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine])],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [TypeOrmModule, MedicineService]
})
export class MedicineModule {}

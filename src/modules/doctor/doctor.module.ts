import { Module } from '@nestjs/common';
import { DoctorController } from './controller/doctor.controller';
import { DoctorService } from './service/doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/common/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [TypeOrmModule, DoctorService]
})
export class DoctorModule {}

import { Module } from '@nestjs/common';
import { DoctorAvailabilityController } from './controller/doctor-availability.controller';
import { DoctorAvailabilityService } from './service/doctor-availability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAvailability } from '../../common/entities/doctor-availability.entity';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorAvailability]), DoctorModule],
  controllers: [DoctorAvailabilityController],
  providers: [DoctorAvailabilityService],
  exports: [TypeOrmModule, DoctorAvailabilityService]
})
export class DoctorAvailabilityModule {}

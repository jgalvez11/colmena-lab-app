import { Module } from '@nestjs/common';
import { AppointmentController } from './controller/appointment.controller';
import { AppointmentService } from './service/appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../../common/entities/appointment.entity';
import { DoctorModule } from '../doctor/doctor.module';
import { PatientModule } from '../patient/patient.module';
import { DoctorAvailabilityModule } from '../doctor-availability/doctor-availability.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    DoctorModule,
    PatientModule,
    DoctorAvailabilityModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [TypeOrmModule, AppointmentService]
})
export class AppointmentModule {}

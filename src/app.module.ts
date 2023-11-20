import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './common/interceptors/error/error.interceptor';
import { MedicineModule } from './modules/medicine/medicine.module';
import { SpecialtyModule } from './modules/specialty/specialty.module';
import { DoctorAvailabilityModule } from './modules/doctor-availability/doctor-availability.module';
import { MedicalOrderModule } from './modules/medical-order/medical-order.module';
import { MedicalOrderMedicineModule } from './modules/medical-order-medicine/medical-order-medicine.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AppointmentModule,
    DoctorModule,
    PatientModule,
    MedicineModule,
    SpecialtyModule,
    DoctorAvailabilityModule,
    MedicalOrderModule,
    MedicalOrderMedicineModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DataSource,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor
    }
  ]
})
export class AppModule {}

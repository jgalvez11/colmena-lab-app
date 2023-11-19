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

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AppointmentModule,
    DoctorModule,
    PatientModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor
    }
  ]
})
export class AppModule {}

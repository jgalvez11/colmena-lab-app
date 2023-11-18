import { Module } from '@nestjs/common';
import { AppointmentController } from './controller/appointment.controller';
import { AppointmentService } from './service/appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/common/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [TypeOrmModule, AppointmentService]
})
export class AppointmentModule {}

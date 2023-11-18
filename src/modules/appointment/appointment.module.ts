import { Module } from '@nestjs/common';
import { AppointmentController } from './controller/appointment.controller';
import { AppointmentService } from './service/appointment.service';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}

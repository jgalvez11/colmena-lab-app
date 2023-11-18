import { Module } from '@nestjs/common';
import { PatientController } from './controller/patient.controller';
import { PatientService } from './service/patient.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}

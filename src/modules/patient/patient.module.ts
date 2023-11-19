import { Module } from '@nestjs/common';
import { PatientController } from './controller/patient.controller';
import { PatientService } from './service/patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../../common/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [TypeOrmModule, PatientService]
})
export class PatientModule {}

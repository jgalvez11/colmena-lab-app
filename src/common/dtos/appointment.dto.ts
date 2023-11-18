import { EAppointmentStatus } from '../enums/appointment-status.enum';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentDto {
  appointmentId: number;

  @ApiProperty({ description: 'Fecha de la cita médica', required: true })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Estado de la cita',
    enum: EAppointmentStatus,
    default: EAppointmentStatus.PROGRAMMED
  })
  status: EAppointmentStatus;

  @ApiProperty({ description: 'Identificación del paciente', required: true })
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(20)
  patientId: number;

  @ApiProperty({ description: 'Identificación del médico', required: true })
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(20)
  doctorId: number;

  createdAt: Date;
  updatedAt: Date;
}

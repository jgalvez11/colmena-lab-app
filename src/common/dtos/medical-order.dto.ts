import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class MedicalOrderDto {
  @ApiProperty({
    description: 'Id de la cita médica',
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  appointmentId: number;

  @ApiProperty({
    description: 'Id del médico',
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @ApiProperty({
    description: 'Id de la especialidad médica',
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  specialtyId: number;

  @ApiProperty({
    description: 'Descripción de la orden de medicamento',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty({
    description: 'Fecha de expiración de la orden médica',
    required: true
  })
  @IsNotEmpty()
  expirationDate: Date;

  @ApiProperty({
    description: 'Lista de medicamentos',
    default: []
  })
  medicines: number[];
}

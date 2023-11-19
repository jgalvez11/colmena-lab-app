import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DoctorAvailabilityDto {
  @ApiProperty({ description: 'Id del doctor', required: true })
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @ApiProperty({ description: 'Fecha de disponibilidad', required: true })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Estado de la fecha disponible',
    type: 'boolean',
    default: true
  })
  available: boolean;
}

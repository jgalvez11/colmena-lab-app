import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MedicalOrderDto {
  @ApiProperty({
    description: 'Descripción de la orden de medicamento',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  description: string;

  @ApiProperty({
    description: 'Fecha de expiración de la orden médica',
    required: true
  })
  @IsNotEmpty()
  expirationDate: Date;
}

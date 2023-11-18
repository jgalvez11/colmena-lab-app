import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  doctorId: number;

  @ApiProperty({ description: 'Identificación del médico', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  identification: string;

  @ApiProperty({ description: 'Nombre del médico', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(90)
  firstName: string;

  @ApiProperty({ description: 'Apellido del médico', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(90)
  lastName: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(200)
  email: string;

  @ApiProperty({ description: 'Teléfono de contacto', required: true })
  @IsNotEmpty()
  @IsPhoneNumber()
  @MaxLength(20)
  phone: string;

  @ApiProperty({ description: 'Dirección del médico', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  address: string;

  @ApiProperty({ description: 'Ciudad de residencia', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(90)
  city: string;

  @ApiProperty({
    description: 'Número de la tarjeta profesional',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  professionalCardNumber: string;

  @ApiProperty({ description: 'Fecha de ingreso' })
  admissionDate: Date;

  @ApiProperty({ description: 'Médico activo o inactivo' })
  active: boolean;

  createdAt: Date;
  updatedAt: Date;
}

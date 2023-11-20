import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MedicineDto {
  @ApiProperty({ description: 'Nombre de la medicina', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: 'Descripción de la medicina', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;
}

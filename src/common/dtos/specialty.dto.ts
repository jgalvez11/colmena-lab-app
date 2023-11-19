import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SpecialtyDto {
  @ApiProperty({ description: 'Nombre de la especialidad', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}

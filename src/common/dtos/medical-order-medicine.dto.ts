import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class MedicalOrderMedicineDto {
  @ApiProperty({
    description: 'Id de la orden médica',
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(50)
  medicalOrderId: number;

  @ApiProperty({
    description: 'Id de la medicina',
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(50)
  medicineId: number;
}

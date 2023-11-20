import { Controller, Get } from '@nestjs/common';
import { MedicalOrderMedicineService } from '../service/medical-order-medicine.service';
import { MedicalOrderMedicine } from '../../../common/entities/medical-order-medicine.entity';

@Controller('medical-order-medicine')
export class MedicalOrderMedicineController {
  constructor(
    private readonly medicalOrdermedicineService: MedicalOrderMedicineService
  ) {}

  @Get()
  async findAll(): Promise<MedicalOrderMedicine[]> {
    return this.medicalOrdermedicineService.findAll();
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { MedicalOrderMedicineService } from './medical-order-medicine.service';

describe('MedicalOrderMedicineService', () => {
  let service: MedicalOrderMedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalOrderMedicineService],
    }).compile();

    service = module.get<MedicalOrderMedicineService>(MedicalOrderMedicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

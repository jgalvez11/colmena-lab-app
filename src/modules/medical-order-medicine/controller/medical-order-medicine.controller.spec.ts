import { Test, TestingModule } from '@nestjs/testing';
import { MedicalOrderMedicineController } from './medical-order-medicine.controller';

describe('MedicalOrderMedicineController', () => {
  let controller: MedicalOrderMedicineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalOrderMedicineController],
    }).compile();

    controller = module.get<MedicalOrderMedicineController>(MedicalOrderMedicineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

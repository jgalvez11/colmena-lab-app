import { Test, TestingModule } from '@nestjs/testing';
import { MedicalOrderMedicineController } from './medical-order-medicine.controller';
import { MedicalOrderMedicineService } from '../service/medical-order-medicine.service';
import { MedicalOrderMedicine } from '../../../common/entities/medical-order-medicine.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicineService } from '../../../modules/medicine/service/medicine.service';
import { Medicine } from '../../../common/entities/medicine.entity';

describe('MedicalOrderMedicineController', () => {
  let controller: MedicalOrderMedicineController;
  let medicalOrderMedicineService: MedicalOrderMedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalOrderMedicineController],
      providers: [
        MedicalOrderMedicineService,
        MedicineService,
        {
          provide: getRepositoryToken(MedicalOrderMedicine),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Medicine),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<MedicalOrderMedicineController>(
      MedicalOrderMedicineController
    );

    medicalOrderMedicineService = module.get<MedicalOrderMedicineService>(
      MedicalOrderMedicineService
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all medical orders medicine', async () => {
    const medicalsOrdersMedicines: MedicalOrderMedicine[] = [];
    jest
      .spyOn(medicalOrderMedicineService, 'findAll')
      .mockResolvedValue(medicalsOrdersMedicines);

    expect(await controller.findAll()).toBe(medicalsOrdersMedicines);
  });
});

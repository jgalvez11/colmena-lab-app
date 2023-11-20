import { Test, TestingModule } from '@nestjs/testing';
import { MedicalOrderMedicineService } from './medical-order-medicine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicalOrderMedicine } from '../../../common/entities/medical-order-medicine.entity';
import { MedicineService } from '../../../modules/medicine/service/medicine.service';
import { Medicine } from '../../../common/entities/medicine.entity';

describe('MedicalOrderMedicineService', () => {
  let service: MedicalOrderMedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<MedicalOrderMedicineService>(
      MedicalOrderMedicineService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

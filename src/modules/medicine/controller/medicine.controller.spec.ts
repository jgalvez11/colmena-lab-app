import { Test, TestingModule } from '@nestjs/testing';
import { MedicineController } from './medicine.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicine } from '../../../common/entities/medicine.entity';
import { MedicineService } from '../service/medicine.service';

describe('MedicineController', () => {
  let controller: MedicineController;
  let medicineService: MedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineController],
      providers: [
        MedicineService,
        {
          provide: getRepositoryToken(Medicine),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<MedicineController>(MedicineController);
    medicineService = module.get<MedicineService>(MedicineService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all medicines', async () => {
    const medicines: Medicine[] = [];
    jest.spyOn(medicineService, 'findAll').mockResolvedValue(medicines);

    expect(await controller.findAll()).toBe(medicines);
  });
});

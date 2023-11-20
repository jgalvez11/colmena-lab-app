import { Test, TestingModule } from '@nestjs/testing';
import { MedicineService } from './medicine.service';
import { Medicine } from '../../../common/entities/medicine.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const mockMedicineRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  merge: jest.fn(),
  save: jest.fn(),
  delete: jest.fn()
};

const medicineService = new MedicineService(
  mockMedicineRepository as unknown as Repository<Medicine>
);

describe('MedicineService', () => {
  let service: MedicineService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<MedicineService>(MedicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of medicines', async () => {
    const expectedMedicines = [
      { id: 1, name: 'Medicine 1', description: 'Description 1' },
      { id: 2, name: 'Medicine 2', description: 'Description 2' }
    ];

    mockMedicineRepository.find.mockResolvedValue(expectedMedicines);

    const specialties = await medicineService.findAll();

    expect(specialties).toEqual(expectedMedicines);
  });

  it('should throw NotFoundException when medicine is not found', async () => {
    const medicineId = 999;
    mockMedicineRepository.findOne.mockResolvedValue(null);

    await expect(medicineService.findOne(medicineId)).rejects.toThrow(
      NotFoundException
    );
  });

  it('should create a new medicine', async () => {
    const newMedicineDto = {
      name: 'New medicine',
      description: 'new description'
    };
    const createdmedicine = { id: 1, ...newMedicineDto };
    mockMedicineRepository.create.mockReturnValue(createdmedicine);
    mockMedicineRepository.save.mockResolvedValue(createdmedicine);

    const result = await medicineService.create(newMedicineDto);

    expect(mockMedicineRepository.create).toHaveBeenCalledWith(newMedicineDto);
    expect(mockMedicineRepository.save).toHaveBeenCalledWith(createdmedicine);
    expect(result).toEqual(createdmedicine);
  });

  it('should throw NotFoundException when trying to remove a non-existing medicine', async () => {
    const medicineId = 999;
    mockMedicineRepository.findOne.mockResolvedValue(null);

    await expect(medicineService.remove(medicineId)).rejects.toThrow(
      NotFoundException
    );

    expect(mockMedicineRepository.delete).not.toHaveBeenCalled();
  });
});

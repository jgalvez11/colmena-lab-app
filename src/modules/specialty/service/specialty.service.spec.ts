import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Specialty } from '../../../common/entities/specialty.entity';
import { Repository } from 'typeorm';

const mockSpecialtyRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  merge: jest.fn(),
  save: jest.fn(),
  delete: jest.fn()
};

const specialtyService = new SpecialtyService(
  mockSpecialtyRepository as unknown as Repository<Specialty>
);

describe('SpecialtyService', () => {
  let service: SpecialtyService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecialtyService,
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<SpecialtyService>(SpecialtyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of specialties', async () => {
    const expectedSpecialties = [
      { id: 1, name: 'Specialty 1' },
      { id: 2, name: 'Specialty 2' }
    ];

    mockSpecialtyRepository.find.mockResolvedValue(expectedSpecialties);

    const specialties = await specialtyService.findAll();

    expect(specialties).toEqual(expectedSpecialties);
  });

  it('should throw NotFoundException when specialty is not found', async () => {
    const specialtyId = 999;
    mockSpecialtyRepository.findOne.mockResolvedValue(null);

    await expect(specialtyService.findOne(specialtyId)).rejects.toThrow(
      NotFoundException
    );
  });

  it('should create a new specialty', async () => {
    const newSpecialtyDto = { name: 'New Specialty' };
    const createdSpecialty = { id: 1, ...newSpecialtyDto };
    mockSpecialtyRepository.create.mockReturnValue(createdSpecialty);
    mockSpecialtyRepository.save.mockResolvedValue(createdSpecialty);

    const result = await specialtyService.create(newSpecialtyDto);

    expect(mockSpecialtyRepository.create).toHaveBeenCalledWith(
      newSpecialtyDto
    );
    expect(mockSpecialtyRepository.save).toHaveBeenCalledWith(createdSpecialty);
    expect(result).toEqual(createdSpecialty);
  });

  it('should throw NotFoundException when trying to remove a non-existing specialty', async () => {
    const specialtyId = 999;
    mockSpecialtyRepository.findOne.mockResolvedValue(null);

    await expect(specialtyService.remove(specialtyId)).rejects.toThrow(
      NotFoundException
    );

    expect(mockSpecialtyRepository.delete).not.toHaveBeenCalled();
  });
});

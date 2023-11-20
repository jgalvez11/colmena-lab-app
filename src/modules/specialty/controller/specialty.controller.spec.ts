import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyService } from '../service/specialty.service';
import { Specialty } from '../../../common/entities/specialty.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SpecialtyController', () => {
  let controller: SpecialtyController;
  let specialtyService: SpecialtyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialtyController],
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

    controller = module.get<SpecialtyController>(SpecialtyController);
    specialtyService = module.get<SpecialtyService>(SpecialtyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all specialties', async () => {
    const specialties: Specialty[] = [];
    jest.spyOn(specialtyService, 'findAll').mockResolvedValue(specialties);

    expect(await controller.findAll()).toBe(specialties);
  });
});

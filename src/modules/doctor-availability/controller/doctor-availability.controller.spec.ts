import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailabilityController } from './doctor-availability.controller';
import { DoctorAvailabilityService } from '../service/doctor-availability.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorAvailability } from '../../../common/entities/doctor-availability.entity';
import { DoctorService } from '../../../modules/doctor/service/doctor.service';
import { Doctor } from '../../../common/entities/doctor.entity';

describe('DoctorAvailabilityController', () => {
  let controller: DoctorAvailabilityController;
  let doctorAvailabilityService: DoctorAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorAvailabilityController],
      providers: [
        DoctorAvailabilityService,
        DoctorService,
        {
          provide: getRepositoryToken(DoctorAvailability),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Doctor),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<DoctorAvailabilityController>(
      DoctorAvailabilityController
    );
    doctorAvailabilityService = module.get<DoctorAvailabilityService>(
      DoctorAvailabilityService
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all doctor availability', async () => {
    const availabilities: DoctorAvailability[] = [];
    jest
      .spyOn(doctorAvailabilityService, 'findAll')
      .mockResolvedValue(availabilities);

    expect(await controller.findAll()).toBe(availabilities);
  });
});

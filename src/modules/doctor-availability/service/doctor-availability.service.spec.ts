import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { DoctorService } from '../../../modules/doctor/service/doctor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorAvailability } from '../../../common/entities/doctor-availability.entity';
import { DoctorAvailabilityDto } from '../../../common/dtos/doctor-availability.dto';
import { DoctorModule } from '../../../modules/doctor/doctor.module';

describe('DoctorAvailabilityService', () => {
  let doctorAvailabilityService: DoctorAvailabilityService;
  let doctorService: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DoctorModule],
      providers: [
        DoctorAvailabilityService,
        {
          provide: getRepositoryToken(DoctorAvailability),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    doctorAvailabilityService = module.get<DoctorAvailabilityService>(
      DoctorAvailabilityService
    );
    doctorService = module.get<DoctorService>(DoctorService);
  });

  it('should create a new doctor availability', async () => {
    const doctorAvailabilityDto: DoctorAvailabilityDto = {
      doctorId: 7,
      date: new Date(),
      available: true
    };

    const doctorAvailabilityEntity: DoctorAvailability = {
      availabilityId: 2,
      doctorId: 7,
      date: new Date(),
      available: true,
      doctor: null
    };

    jest.spyOn(doctorService, 'findOne').mockResolvedValue({
      doctorId: 7,
      identification: '1098746650',
      firstName: 'Pepito',
      lastName: 'Perez',
      email: 'pepitoPerez@gmail.com',
      phone: '+573028440204',
      address: 'Luna del bosque, Robledo, Apto 1117',
      city: 'medellin',
      active: true,
      professionalCardNumber: '536548954840',
      admissionDate: new Date(),
      doctorAvailabilities: [],
      createdAt: new Date(),
      updatedAt: null,
      appointments: []
    });

    jest
      .spyOn(
        doctorAvailabilityService['doctorAvailabilityRepository'],
        'create'
      )
      .mockReturnValue(doctorAvailabilityEntity);
    jest
      .spyOn(doctorAvailabilityService['doctorAvailabilityRepository'], 'save')
      .mockResolvedValue(doctorAvailabilityEntity);

    const result = await doctorAvailabilityService.create(
      doctorAvailabilityDto
    );

    expect(doctorService.findOne).toHaveBeenCalledWith(
      doctorAvailabilityDto.doctorId
    );
    expect(
      doctorAvailabilityService['doctorAvailabilityRepository'].create
    ).toHaveBeenCalledWith(doctorAvailabilityDto);
    expect(
      doctorAvailabilityService['doctorAvailabilityRepository'].save
    ).toHaveBeenCalledWith(doctorAvailabilityEntity);
    expect(result).toEqual(doctorAvailabilityEntity);
  });

  it('should update an existing doctor availability', async () => {
    const id = 1;
    const updatedDto = {
      doctorId: 7,
      date: new Date(),
      available: true,
      availabilityId: 2,
      doctor: null
    };
    const existingDoctorAvailability = {
      availabilityId: 2,
      doctorId: 7,
      date: new Date(),
      available: true,
      doctor: null
    };

    jest
      .spyOn(doctorAvailabilityService, 'findOne')
      .mockResolvedValue(existingDoctorAvailability);
    jest
      .spyOn(doctorAvailabilityService['doctorAvailabilityRepository'], 'merge')
      .mockReturnValue(updatedDto);
    jest
      .spyOn(doctorAvailabilityService['doctorAvailabilityRepository'], 'save')
      .mockResolvedValue(updatedDto);

    const result = await doctorAvailabilityService.update(id, updatedDto);

    expect(doctorAvailabilityService.findOne).toHaveBeenCalledWith(id);
    expect(
      doctorAvailabilityService['doctorAvailabilityRepository'].merge
    ).toHaveBeenCalledWith(existingDoctorAvailability, updatedDto);
    expect(
      doctorAvailabilityService['doctorAvailabilityRepository'].save
    ).toHaveBeenCalledWith(updatedDto);
    expect(result).toEqual(updatedDto);
  });
});

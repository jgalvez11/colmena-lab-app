import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from './doctor.service';
import { doctorRepositoryMock } from '../../../../test/mocks/doctor-repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from '../../../common/entities/doctor.entity';
import { DoctorDto } from '../../../common/dtos/doctor.dto';

describe('DoctorService', () => {
  let service: DoctorService;
  let doctorRepository: doctorRepositoryMock;

  beforeEach(async () => {
    doctorRepository = new doctorRepositoryMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: doctorRepository
        }
      ]
    }).compile();

    service = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a doctor', async () => {
    const doctorDto: DoctorDto = {
      doctorId: 1,
      identification: '1010102',
      firstName: 'Maria',
      lastName: 'Auxiliadora',
      email: 'maria@gmail.com',
      phone: '+573126549878',
      address: 'Luna del bosque, Robledo, Apto 1117',
      city: 'medellin',
      professionalCardNumber: '321564878975',
      admissionDate: new Date(),
      active: true,
      createdAt: new Date(),
      updatedAt: null
    };

    const doctor = await service.create(doctorDto);
    expect(doctor).toBeDefined();
    expect(doctor.doctorId).toBeDefined();
  });
});

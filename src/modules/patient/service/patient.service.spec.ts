import { PatientService } from './patient.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientDto } from '../../../common/dtos/patient.dto';
import { Patient } from '../../../common/entities/patient.entity';
import { PatientRepositoryMock } from '../../../../test/mocks/patient-repository.mock';

describe('PatientService', () => {
  let service: PatientService;
  let patientRepository: PatientRepositoryMock;

  beforeEach(async () => {
    patientRepository = new PatientRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getRepositoryToken(Patient),
          useValue: patientRepository
        }
      ]
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a patient', async () => {
    const patientDto: PatientDto = {
      patientId: 1,
      identification: '1010102',
      firstName: 'Maria',
      lastName: 'Auxiliadora',
      email: 'maria@gmail.com',
      phone: '+573126549878',
      address: 'Luna del bosque, Robledo, Apto 1117',
      city: 'medellin',
      active: true,
      createdAt: new Date(),
      updatedAt: null
    };

    const patient = await service.create(patientDto);
    expect(patient).toBeDefined();
    expect(patient.patientId).toBeDefined();
  });
});

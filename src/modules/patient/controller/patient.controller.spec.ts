import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientDto } from '../../../common/dtos/patient.dto';
import { Patient } from '../../../common/entities/patient.entity';
import { PatientService } from '../service/patient.service';
import { PatientRepositoryMock } from '../../../../test/mocks/patient-repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

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

const result: Patient = {
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
  updatedAt: null,
  appointments: []
};

describe('PatientController', () => {
  let controller: PatientController;
  let patientService: PatientService;
  let patientRepository: PatientRepositoryMock;

  beforeEach(async () => {
    patientRepository = new PatientRepositoryMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        PatientService,
        {
          provide: getRepositoryToken(Patient),
          useValue: patientRepository
        }
      ]
    }).compile();

    controller = module.get<PatientController>(PatientController);
    patientService = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all patients', async () => {
    const patients: Patient[] = [];
    jest.spyOn(patientService, 'findAll').mockResolvedValue(patients);

    expect(await controller.findAll()).toBe(patients);
  });

  it('should return one patient by id', async () => {
    const patientId = 1;

    jest.spyOn(patientService, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(patientId)).toBe(result);
  });

  it('create patient should return the newly created patient', async () => {
    jest.spyOn(patientService, 'create').mockImplementation(async () => result);

    expect(await controller.create(patientDto)).toBe(result);
  });

  it('update patient should return the updated patient', async () => {
    const patientId = 1;

    jest.spyOn(patientService, 'update').mockImplementation(async () => result);

    expect(await controller.update(patientId, patientDto)).toBe(result);
  });

  it('remove patient should remove the patient', async () => {
    const patientId = 1;
    jest.spyOn(patientService, 'remove').mockImplementation(async () => {});

    expect(await controller.remove(patientId)).toBeUndefined();
  });
});

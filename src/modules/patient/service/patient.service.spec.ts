import { PatientService } from './patient.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientDto } from '../../../common/dtos/patient.dto';
import { Patient } from '../../../common/entities/patient.entity';

class PatientRepositoryMock {
  private readonly patients: Patient[] = [];

  async find(): Promise<Patient[]> {
    return this.patients;
  }

  async findOneBy(patientId: number): Promise<Patient | undefined> {
    return this.patients.find((patient) => patient.patientId === patientId);
  }

  async create(patientDto: PatientDto): Promise<Patient> {
    const patient = new Patient();
    Object.assign(patient, patientDto);
    this.patients.push(patient);
    return patient;
  }

  async merge(
    existingPatient: Patient,
    patientDto: PatientDto
  ): Promise<Patient> {
    Object.assign(existingPatient, patientDto);
    return existingPatient;
  }

  async save(patient: Patient): Promise<Patient> {
    const existingPatient = this.patients.find(
      (p) => p.patientId === patient.patientId
    );
    if (existingPatient) {
      Object.assign(existingPatient, patient);
      return existingPatient;
    }
    this.patients.push(patient);
    return patient;
  }

  async delete(patientId: number): Promise<void> {
    const index = this.patients.findIndex(
      (patient) => patient.patientId === patientId
    );
    if (index !== -1) {
      this.patients.splice(index, 1);
    }
  }
}

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

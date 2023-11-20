import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { Appointment } from '../../../common/entities/appointment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppointmentRepositoryMock } from '../../../../test/mocks/appointment-repository.mock';
import { DoctorService } from '../../../modules/doctor/service/doctor.service';
import { PatientService } from '../../../modules/patient/service/patient.service';
import { DoctorAvailabilityService } from '../../../modules/doctor-availability/service/doctor-availability.service';
import { DataSource } from 'typeorm';
import { Doctor } from '../../../common/entities/doctor.entity';
import { DoctorAvailability } from '../../../common/entities/doctor-availability.entity';
import { Patient } from '../../../common/entities/patient.entity';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let appointmentRepository: AppointmentRepositoryMock;

  beforeEach(async () => {
    appointmentRepository = new AppointmentRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        DoctorService,
        PatientService,
        DoctorAvailabilityService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: appointmentRepository
        },
        {
          provide: getRepositoryToken(DataSource),
          useValue: {
            name: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Doctor),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Patient),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(DoctorAvailability),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all appointments', async () => {
    const appointment = await service.findAll();
    expect(appointment).toBeDefined();
    expect(appointment.length).toBe(0);
  });
});

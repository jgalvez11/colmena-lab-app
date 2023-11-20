import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { Appointment } from '../../../common/entities/appointment.entity';
import { AppointmentDto } from '../../../common/dtos/appointment.dto';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { EAppointmentStatus } from '../../../common/enums/appointment-status.enum';
import { AppointmentRepositoryMock } from '../../../../test/mocks/appointment-repository.mock';
import { DoctorModule } from '../../../modules/doctor/doctor.module';
import { PatientModule } from '../../../modules/patient/patient.module';
import { DoctorAvailabilityModule } from '../../../modules/doctor-availability/doctor-availability.module';
import { DataSource } from 'typeorm';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let appointmentRepository: AppointmentRepositoryMock;

  beforeEach(async () => {
    appointmentRepository = new AppointmentRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule,
        DoctorModule,
        PatientModule,
        DoctorAvailabilityModule
      ],
      providers: [
        AppointmentService,
        {
          provide: DataSource,
          useValue: {}
        },
        {
          provide: getRepositoryToken(Appointment),
          useValue: appointmentRepository
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

  it('should create an appointment', async () => {
    const appointmentDto: AppointmentDto = {
      patientId: 1,
      doctorId: 1,
      appointmentId: 1,
      date: new Date(),
      status: EAppointmentStatus.PROGRAMMED,
      createdAt: new Date(),
      updatedAt: null
    };

    const appointment = await service.create(appointmentDto);
    expect(appointment).toBeDefined();
    expect(appointment.appointmentId).toBeDefined();
  });
});

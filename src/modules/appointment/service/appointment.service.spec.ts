import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { Appointment } from '../../../common/entities/appointment.entity';
import { AppointmentDto } from '../../../common/dtos/appointment.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EAppointmentStatus } from '../../../common/enums/appointment-status.enum';
import { AppointmentRepositoryMock } from '../../../../test/mocks/appointment-repository.mock';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let appointmentRepository: AppointmentRepositoryMock;

  beforeEach(async () => {
    appointmentRepository = new AppointmentRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: appointmentRepository
        }
      ]
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

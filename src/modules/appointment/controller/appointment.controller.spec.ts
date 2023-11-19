import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from '../service/appointment.service';
import { AppointmentRepositoryMock } from '../../../../test/mocks/appointment-repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from '../../../common/entities/appointment.entity';
import { EAppointmentStatus } from '../../../common/enums/appointment-status.enum';
import { AppointmentDto } from 'src/common/dtos/appointment.dto';

const appointmentDto: AppointmentDto = {
  appointmentId: 1,
  doctorId: 1,
  patientId: 1,
  date: new Date(),
  status: EAppointmentStatus.PROGRAMMED,
  createdAt: new Date(),
  updatedAt: null
};

const result: Appointment = {
  appointmentId: 1,
  doctorId: 1,
  patientId: 1,
  date: new Date(),
  status: EAppointmentStatus.PROGRAMMED,
  createdAt: new Date(),
  updatedAt: null,
  patient: null,
  doctor: null
};

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let appointmentService: AppointmentService;
  let appointmentRepository: AppointmentRepositoryMock;

  beforeEach(async () => {
    appointmentRepository = new AppointmentRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: appointmentRepository
        }
      ]
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
    appointmentService = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all appointments', async () => {
    const appointments: Appointment[] = [];
    jest.spyOn(appointmentService, 'findAll').mockResolvedValue(appointments);

    expect(await controller.findAll()).toBe(appointments);
  });

  it('should return one appoinment by id', async () => {
    const appointmentId = 1;

    jest.spyOn(appointmentService, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(appointmentId)).toBe(result);
  });

  it('create appointment should return the newly created appointment', async () => {
    jest
      .spyOn(appointmentService, 'create')
      .mockImplementation(async () => result);

    expect(await controller.create(appointmentDto)).toBe(result);
  });

  it('update appointment should return the updated appointment', async () => {
    const appointmentId = 1;

    jest
      .spyOn(appointmentService, 'update')
      .mockImplementation(async () => result);

    expect(await controller.update(appointmentId, appointmentDto)).toBe(result);
  });

  it('remove appointment should remove the appointment', async () => {
    const appointmentId = 1;
    jest.spyOn(appointmentService, 'remove').mockImplementation(async () => {});

    expect(await controller.remove(appointmentId)).toBeUndefined();
  });
});

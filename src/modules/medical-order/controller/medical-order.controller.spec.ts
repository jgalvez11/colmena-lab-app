import { Test, TestingModule } from '@nestjs/testing';
import { MedicalOrderController } from './medical-order.controller';
import { MedicalOrderService } from '../service/medical-order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicalOrder } from '../../../common/entities/medical-order.entity';
import { AppointmentService } from '../../../modules/appointment/service/appointment.service';
import { SpecialtyService } from '../../../modules/specialty/service/specialty.service';
import { MedicalOrderMedicineService } from '../../../modules/medical-order-medicine/service/medical-order-medicine.service';
import { DoctorService } from '../../../modules/doctor/service/doctor.service';
import { PatientService } from '../../../modules/patient/service/patient.service';
import { DoctorAvailabilityService } from '../../../modules/doctor-availability/service/doctor-availability.service';
import { MedicineService } from '../../../modules/medicine/service/medicine.service';
import { Medicine } from '../../../common/entities/medicine.entity';
import { DoctorAvailability } from '../../../common/entities/doctor-availability.entity';
import { Patient } from '../../../common/entities/patient.entity';
import { Doctor } from '../../../common/entities/doctor.entity';
import { MedicalOrderMedicine } from '../../../common/entities/medical-order-medicine.entity';
import { Specialty } from '../../../common/entities/specialty.entity';
import { Appointment } from '../../../common/entities/appointment.entity';
import { DataSource } from 'typeorm';

describe('MedicalOrderController', () => {
  let controller: MedicalOrderController;
  let medicalOrderService: MedicalOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalOrderController],
      providers: [
        MedicalOrderService,
        AppointmentService,
        SpecialtyService,
        MedicalOrderMedicineService,
        DoctorService,
        PatientService,
        DoctorAvailabilityService,
        MedicineService,
        {
          provide: DataSource,
          useValue: {
            name: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(MedicalOrder),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Appointment),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Specialty),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(MedicalOrderMedicine),
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
        },
        {
          provide: getRepositoryToken(Patient),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(DoctorAvailability),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Medicine),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<MedicalOrderController>(MedicalOrderController);
    medicalOrderService = module.get<MedicalOrderService>(MedicalOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all medical orders', async () => {
    const medicalsOrders: MedicalOrder[] = [];
    jest
      .spyOn(medicalOrderService, 'findAll')
      .mockResolvedValue(medicalsOrders);

    expect(await controller.findAll()).toBe(medicalsOrders);
  });
});

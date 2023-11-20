import { Test, TestingModule } from '@nestjs/testing';
import { MedicalOrderService } from './medical-order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicalOrder } from '../../../common/entities/medical-order.entity';
import { AppointmentService } from '../../../modules/appointment/service/appointment.service';
import { SpecialtyService } from '../../../modules/specialty/service/specialty.service';
import { MedicalOrderMedicineService } from '../../../modules/medical-order-medicine/service/medical-order-medicine.service';
import { DataSource } from 'typeorm';
import { Appointment } from '../../../common/entities/appointment.entity';
import { DoctorService } from '../../../modules/doctor/service/doctor.service';
import { PatientService } from '../../../modules/patient/service/patient.service';
import { DoctorAvailabilityService } from '../../../modules/doctor-availability/service/doctor-availability.service';
import { Specialty } from '../../../common/entities/specialty.entity';
import { MedicalOrderMedicine } from '../../../common/entities/medical-order-medicine.entity';
import { Doctor } from '../../../common/entities/doctor.entity';
import { Patient } from '../../../common/entities/patient.entity';
import { DoctorAvailability } from '../../../common/entities/doctor-availability.entity';
import { MedicineService } from '../../../modules/medicine/service/medicine.service';
import { Medicine } from '../../../common/entities/medicine.entity';

describe('MedicalOrderService', () => {
  let medicalOrderService: MedicalOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    medicalOrderService = module.get<MedicalOrderService>(MedicalOrderService);
  });

  it('should be defined', () => {
    expect(medicalOrderService).toBeDefined();
  });
});

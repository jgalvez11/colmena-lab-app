import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './doctor.controller';
import { DoctorDto } from '../../../common/dtos/doctor.dto';
import { Doctor } from '../../../common/entities/doctor.entity';
import { DoctorService } from '../service/doctor.service';
import { doctorRepositoryMock } from '../../../../test/mocks/doctor-repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

const doctorDto: DoctorDto = {
  doctorId: 1,
  identification: '1010102',
  firstName: 'Maria',
  lastName: 'Auxiliadora',
  email: 'maria@gmail.com',
  phone: '+573126549878',
  address: 'Luna del bosque, Robledo, Apto 1117',
  city: 'medellin',
  active: true,
  admissionDate: new Date(),
  professionalCardNumber: '316548794651',
  createdAt: new Date(),
  updatedAt: null
};

const result: Doctor = {
  doctorId: 1,
  identification: '1010102',
  firstName: 'Maria',
  lastName: 'Auxiliadora',
  email: 'maria@gmail.com',
  phone: '+573126549878',
  address: 'Luna del bosque, Robledo, Apto 1117',
  city: 'medellin',
  active: true,
  admissionDate: new Date(),
  professionalCardNumber: '316548794651',
  createdAt: new Date(),
  updatedAt: null,
  appointments: []
};

describe('DoctorController', () => {
  let controller: DoctorController;
  let doctorService: DoctorService;
  let doctorRepository: doctorRepositoryMock;

  beforeEach(async () => {
    doctorRepository = new doctorRepositoryMock();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        DoctorService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: doctorRepository
        }
      ]
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
    doctorService = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all doctors', async () => {
    const doctors: Doctor[] = [];
    jest.spyOn(doctorService, 'findAll').mockResolvedValue(doctors);

    expect(await controller.findAll()).toBe(doctors);
  });

  it('should return one doctor by id', async () => {
    const doctorId = 1;

    jest.spyOn(doctorService, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(doctorId)).toBe(result);
  });

  it('create doctor should return the newly created doctor', async () => {
    jest.spyOn(doctorService, 'create').mockImplementation(async () => result);

    expect(await controller.create(doctorDto)).toBe(result);
  });

  it('update doctor should return the updated doctor', async () => {
    const doctorId = 1;

    jest.spyOn(doctorService, 'update').mockImplementation(async () => result);

    expect(await controller.update(doctorId, doctorDto)).toBe(result);
  });

  it('remove doctor should remove the doctor', async () => {
    const doctorId = 1;
    jest.spyOn(doctorService, 'remove').mockImplementation(async () => {});

    expect(await controller.remove(doctorId)).toBeUndefined();
  });
});

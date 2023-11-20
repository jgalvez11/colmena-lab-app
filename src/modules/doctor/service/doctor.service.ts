import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorDto } from '../../../common/dtos/doctor.dto';
import { Doctor } from '../../../common/entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>
  ) {}

  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find();
  }

  async findOne(doctorId: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: [
        {
          doctorId
        },
        {
          identification: String(doctorId)
        }
      ]
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
    return doctor;
  }

  async findAvailableDoctorsForDate(date: Date): Promise<Doctor[]> {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime());
    endDate.setDate(endDate.getDate() + 1);

    return await this.doctorRepository
      .createQueryBuilder('doctor')
      .innerJoin('doctor.doctorAvailabilities', 'availability')
      .where(
        'availability.date >= :startDate AND availability.date < :endDate AND availability.available = true',
        {
          startDate,
          endDate
        }
      )
      .getMany();
  }

  async create(doctorDto: DoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(doctorDto);
    return await this.doctorRepository.save(doctor);
  }

  async update(id: number, doctorDto: DoctorDto): Promise<Doctor> {
    const existingDoctor = await this.findOne(id);
    this.doctorRepository.merge(existingDoctor, doctorDto);
    return await this.doctorRepository.save(existingDoctor);
  }

  async remove(doctorId: number): Promise<void> {
    await this.findOne(doctorId);
    await this.doctorRepository.delete(doctorId);
  }
}

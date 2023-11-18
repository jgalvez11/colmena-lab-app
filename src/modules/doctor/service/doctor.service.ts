import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorDto } from 'src/common/dtos/doctor.dto';
import { Doctor } from 'src/common/entities/doctor.entity';
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
    const doctor = await this.doctorRepository.findOneBy({ doctorId });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
    return doctor;
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
    await this.doctorRepository.delete(doctorId);
  }
}

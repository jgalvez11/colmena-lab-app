import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientDto } from '../../../common/dtos/patient.dto';
import { Patient } from '../../../common/entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) {}

  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async findOne(patientId: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: [
        {
          patientId
        },
        {
          identification: String(patientId)
        }
      ]
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    return patient;
  }

  async create(patientDto: PatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(patientDto);
    return await this.patientRepository.save(patient);
  }

  async update(id: number, patientDto: PatientDto): Promise<Patient> {
    const existingPatient = await this.findOne(id);
    this.patientRepository.merge(existingPatient, patientDto);
    return await this.patientRepository.save(existingPatient);
  }

  async remove(patientId: number): Promise<void> {
    await this.findOne(patientId);
    await this.patientRepository.delete(patientId);
  }
}

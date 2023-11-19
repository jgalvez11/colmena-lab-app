import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialtyDto } from '../../../common/dtos/specialty.dto';
import { Specialty } from '../../../common/entities/specialty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>
  ) {}

  async findAll(): Promise<Specialty[]> {
    return await this.specialtyRepository.find();
  }

  async findOne(specialtyId: number): Promise<Specialty> {
    const specialty = await this.specialtyRepository.findOneBy({ specialtyId });

    if (!specialty) {
      throw new NotFoundException(`Specialty with ID ${specialtyId} not found`);
    }

    return specialty;
  }

  async create(specialtyDto: SpecialtyDto): Promise<Specialty> {
    const specialty = this.specialtyRepository.create(specialtyDto);
    return await this.specialtyRepository.save(specialty);
  }

  async update(id: number, specialtyDto: SpecialtyDto): Promise<Specialty> {
    const existingSpecialty = await this.findOne(id);
    this.specialtyRepository.merge(existingSpecialty, specialtyDto);
    return await this.specialtyRepository.save(existingSpecialty);
  }

  async remove(specialtyId: number): Promise<void> {
    await this.findOne(specialtyId);
    await this.specialtyRepository.delete(specialtyId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorAvailabilityDto } from '../../../common/dtos/doctor-availability.dto';
import { DoctorAvailability } from '../../../common/entities/doctor-availability.entity';
import { DoctorService } from '../../../modules/doctor/service/doctor.service';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorAvailabilityService {
  constructor(
    @InjectRepository(DoctorAvailability)
    private readonly doctorAvailabilityRepository: Repository<DoctorAvailability>,
    private readonly doctorService: DoctorService
  ) {}

  async findAll(): Promise<DoctorAvailability[]> {
    return await this.doctorAvailabilityRepository.find();
  }

  async findOne(availabilityId: number): Promise<DoctorAvailability> {
    const doctorAvailability =
      await this.doctorAvailabilityRepository.findOneBy({ availabilityId });

    if (!doctorAvailability) {
      throw new NotFoundException(
        `DoctorAvailability with ID ${availabilityId} not found`
      );
    }

    return doctorAvailability;
  }

  async create(
    doctorAvailabilityDto: DoctorAvailabilityDto
  ): Promise<DoctorAvailability> {
    const doctorAvailability = this.doctorAvailabilityRepository.create(
      doctorAvailabilityDto
    );
    await this.doctorService.findOne(doctorAvailabilityDto.doctorId);
    return await this.doctorAvailabilityRepository.save(doctorAvailability);
  }

  async update(
    id: number,
    doctorAvailabilityDto: DoctorAvailabilityDto
  ): Promise<DoctorAvailability> {
    const existingDoctorAvailability = await this.findOne(id);
    this.doctorAvailabilityRepository.merge(
      existingDoctorAvailability,
      doctorAvailabilityDto
    );
    return await this.doctorAvailabilityRepository.save(
      existingDoctorAvailability
    );
  }

  async remove(doctorAvailabilityId: number): Promise<void> {
    await this.findOne(doctorAvailabilityId);
    await this.doctorAvailabilityRepository.delete(doctorAvailabilityId);
  }
}

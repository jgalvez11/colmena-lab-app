import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentDto } from '../../../common/dtos/appointment.dto';
import { Appointment } from '../../../common/entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find();
  }

  async findOne(appointmentId: number): Promise<Appointment> {
    return await this.appointmentRepository.findOne({
      where: { appointmentId }
    });
  }

  async create(appointmentDto: AppointmentDto): Promise<Appointment> {
    const newAppointment = this.appointmentRepository.create(appointmentDto);
    return await this.appointmentRepository.save(newAppointment);
  }

  async update(
    appointmentId: number,
    appointmentDto: AppointmentDto
  ): Promise<Appointment> {
    await this.appointmentRepository.update(appointmentId, appointmentDto);
    return await this.appointmentRepository.findOneBy({ appointmentId });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.appointmentRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentDto } from '../../../common/dtos/appointment.dto';
import { Appointment } from '../../../common/entities/appointment.entity';
import { MoreThan, Repository } from 'typeorm';
import { DoctorService } from '../../../modules/doctor/service/doctor.service';
import { PatientService } from '../../../modules/patient/service/patient.service';
import { DoctorAvailabilityService } from 'src/modules/doctor-availability/service/doctor-availability.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private doctorAvailabilityService: DoctorAvailabilityService
  ) {}

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find();
  }

  async findOne(appointmentId: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { appointmentId }
    });

    if (!appointment) {
      throw new NotFoundException(
        `Appointment with ID ${appointmentId} not found`
      );
    }

    return appointment;
  }

  async findByIdentification(identification: string): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: [{ doctor: { identification } }, { patient: { identification } }]
    });
  }

  async findByDate(date: Date): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { date: MoreThan(date) }
    });
  }

  async create(appointmentDto: AppointmentDto): Promise<Appointment> {
    await this.doctorService.findOne(appointmentDto.doctorId);
    await this.patientService.findOne(appointmentDto.patientId);

    await this.doctorAvailabilityService.findByDoctorIdAndDate(
      appointmentDto.doctorId,
      appointmentDto.date
    );
    const newAppointment = this.appointmentRepository.create(appointmentDto);
    return await this.appointmentRepository.save(newAppointment);
  }

  async update(
    appointmentId: number,
    appointmentDto: AppointmentDto
  ): Promise<Appointment> {
    await this.findOne(appointmentId);
    await this.doctorService.findOne(appointmentDto.doctorId);
    await this.patientService.findOne(appointmentDto.patientId);
    await this.doctorAvailabilityService.findByDoctorIdAndDate(
      appointmentDto.doctorId,
      appointmentDto.date
    );
    await this.appointmentRepository.update(appointmentId, appointmentDto);
    const result = await this.appointmentRepository.findOneBy({ appointmentId });
    return result;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.appointmentRepository.delete(id);
  }
}

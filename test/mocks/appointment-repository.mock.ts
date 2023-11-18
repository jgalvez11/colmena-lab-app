import { AppointmentDto } from '../../src/common/dtos/appointment.dto';
import { Appointment } from '../../src/common/entities/appointment.entity';

export class AppointmentRepositoryMock {
  private readonly appointments: Appointment[] = [];

  async find(): Promise<Appointment[]> {
    return this.appointments;
  }

  async findOneBy(appointmentId: number): Promise<Appointment | undefined> {
    return this.appointments.find(
      (appointment) => appointment.appointmentId === appointmentId
    );
  }

  async create(appointmentDto: AppointmentDto): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, appointmentDto);
    this.appointments.push(appointment);
    return appointment;
  }

  async merge(
    existingAppointment: Appointment,
    appointmentDto: AppointmentDto
  ): Promise<Appointment> {
    Object.assign(existingAppointment, appointmentDto);
    return existingAppointment;
  }

  async save(appointment: Appointment): Promise<Appointment> {
    const existingAppointment = this.appointments.find(
      (p) => p.appointmentId === appointment.appointmentId
    );
    if (existingAppointment) {
      Object.assign(existingAppointment, appointment);
      return existingAppointment;
    }
    this.appointments.push(appointment);
    return appointment;
  }

  async delete(appointmentId: number): Promise<void> {
    const index = this.appointments.findIndex(
      (appointment) => appointment.appointmentId === appointmentId
    );
    if (index !== -1) {
      this.appointments.splice(index, 1);
    }
  }
}

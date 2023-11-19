import { AppointmentDto } from '../../src/common/dtos/appointment.dto';
import { Appointment } from '../../src/common/entities/appointment.entity';

export class AppointmentRepositoryMock {
  private readonly _appointments: Appointment[] = [];

  get appointments(): Appointment[] {
    return this._appointments;
  }

  set appointments(appointment: Appointment[]) {
    this._appointments.push(...appointment);
  }

  async find(): Promise<Appointment[]> {
    return this._appointments;
  }

  async findOne(appointmentId: number): Promise<Appointment | undefined> {
    return this._appointments.find(
      (appointment) => appointment.appointmentId === appointmentId
    );
  }

  async create(appointmentDto: AppointmentDto): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, appointmentDto);
    this._appointments.push(appointment);
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
    const existingAppointment = this._appointments.find(
      (p) => p.appointmentId === appointment.appointmentId
    );
    if (existingAppointment) {
      Object.assign(existingAppointment, appointment);
      return existingAppointment;
    }
    this._appointments.push(appointment);
    return appointment;
  }

  async delete(appointmentId: number): Promise<void> {
    const index = this._appointments.findIndex(
      (appointment) => appointment.appointmentId === appointmentId
    );
    if (index !== -1) {
      this._appointments.splice(index, 1);
    }
  }
}

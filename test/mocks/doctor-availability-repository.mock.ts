import { DoctorAvailabilityDto } from '../../src/common/dtos/doctor-availability.dto';
import { DoctorAvailability } from '../../src/common/entities/doctor-availability.entity';

export class DoctorAvailabilityRepositoryMock {
  private readonly doctorAvailabilities: DoctorAvailability[] = [];

  async find(): Promise<DoctorAvailability[]> {
    return this.doctorAvailabilities;
  }

  async findOneBy(doctorId: number): Promise<DoctorAvailability | undefined> {
    return this.doctorAvailabilities.find(
      (doctor) => doctor.doctorId === doctorId
    );
  }

  async create(doctorDto: DoctorAvailability): Promise<DoctorAvailability> {
    const doctor = new DoctorAvailability();
    Object.assign(doctor, doctorDto);
    this.doctorAvailabilities.push(doctor);
    return doctor;
  }

  async merge(
    existingdoctor: DoctorAvailability,
    doctorDto: DoctorAvailabilityDto
  ): Promise<DoctorAvailability> {
    Object.assign(existingdoctor, doctorDto);
    return existingdoctor;
  }

  async save(doctor: DoctorAvailability): Promise<DoctorAvailability> {
    const existingdoctor = this.doctorAvailabilities.find(
      (p) => p.doctorId === doctor.doctorId
    );
    if (existingdoctor) {
      Object.assign(existingdoctor, doctor);
      return existingdoctor;
    }
    this.doctorAvailabilities.push(doctor);
    return doctor;
  }

  async delete(doctorId: number): Promise<void> {
    const index = this.doctorAvailabilities.findIndex(
      (doctor) => doctor.doctorId === doctorId
    );
    if (index !== -1) {
      this.doctorAvailabilities.splice(index, 1);
    }
  }
}

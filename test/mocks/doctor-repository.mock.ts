import { DoctorDto } from '../../src/common/dtos/doctor.dto';
import { Doctor } from '../../src/common/entities/doctor.entity';

export class DoctorRepositoryMock {
  private readonly doctors: Doctor[] = [];

  async find(): Promise<Doctor[]> {
    return this.doctors;
  }

  async findOneBy(doctorId: number): Promise<Doctor | undefined> {
    return this.doctors.find((doctor) => doctor.doctorId === doctorId);
  }

  async create(doctorDto: Doctor): Promise<Doctor> {
    const doctor = new Doctor();
    Object.assign(doctor, doctorDto);
    this.doctors.push(doctor);
    return doctor;
  }

  async merge(existingdoctor: Doctor, doctorDto: DoctorDto): Promise<Doctor> {
    Object.assign(existingdoctor, doctorDto);
    return existingdoctor;
  }

  async save(doctor: Doctor): Promise<Doctor> {
    const existingdoctor = this.doctors.find(
      (p) => p.doctorId === doctor.doctorId
    );
    if (existingdoctor) {
      Object.assign(existingdoctor, doctor);
      return existingdoctor;
    }
    this.doctors.push(doctor);
    return doctor;
  }

  async delete(doctorId: number): Promise<void> {
    const index = this.doctors.findIndex(
      (doctor) => doctor.doctorId === doctorId
    );
    if (index !== -1) {
      this.doctors.splice(index, 1);
    }
  }
}

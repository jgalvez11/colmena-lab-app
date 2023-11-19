import { PatientDto } from '../../src/common/dtos/patient.dto';
import { Patient } from '../../src/common/entities/patient.entity';

export class PatientRepositoryMock {
  private readonly patients: Patient[] = [];

  async find(): Promise<Patient[]> {
    return this.patients;
  }

  async findOneBy(patientId: number): Promise<Patient | undefined> {
    return this.patients.find((patient) => patient.patientId === patientId);
  }

  async create(patientDto: PatientDto): Promise<Patient> {
    const patient = new Patient();
    Object.assign(patient, patientDto);
    this.patients.push(patient);
    return patient;
  }

  async merge(
    existingPatient: Patient,
    patientDto: PatientDto
  ): Promise<Patient> {
    Object.assign(existingPatient, patientDto);
    return existingPatient;
  }

  async save(patient: Patient): Promise<Patient> {
    const existingPatient = this.patients.find(
      (p) => p.patientId === patient.patientId
    );
    if (existingPatient) {
      Object.assign(existingPatient, patient);
      return existingPatient;
    }
    this.patients.push(patient);
    return patient;
  }

  async delete(patientId: number): Promise<void> {
    const index = this.patients.findIndex(
      (patient) => patient.patientId === patientId
    );
    if (index !== -1) {
      this.patients.splice(index, 1);
    }
  }
}

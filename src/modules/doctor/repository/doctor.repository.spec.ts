import { DoctorRepository } from './doctor.repository';

describe('DoctorRepository', () => {
  it('should be defined', () => {
    expect(new DoctorRepository()).toBeDefined();
  });
});

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicineDto } from '../../../common/dtos/medicine.dto';
import { Medicine } from '../../../common/entities/medicine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>
  ) {}

  async findAll(): Promise<Medicine[]> {
    return await this.medicineRepository.find();
  }

  async findOne(medicineId: number): Promise<Medicine> {
    const medicine = await this.medicineRepository.findOneBy({ medicineId });

    if (!medicine) {
      throw new NotFoundException(`Medicine with ID ${medicineId} not found`);
    }

    return medicine;
  }

  async create(medicineDto: MedicineDto): Promise<Medicine> {
    const medicine = this.medicineRepository.create(medicineDto);
    return await this.medicineRepository.save(medicine);
  }

  async update(id: number, medicineDto: MedicineDto): Promise<Medicine> {
    const existingMedicine = await this.findOne(id);
    this.medicineRepository.merge(existingMedicine, medicineDto);
    return await this.medicineRepository.save(existingMedicine);
  }

  async remove(medicineId: number): Promise<void> {
    await this.medicineRepository.delete(medicineId);
  }
}

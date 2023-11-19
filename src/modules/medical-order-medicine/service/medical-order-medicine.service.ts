import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalOrderMedicine } from '../../../common/entities/medical-order-medicine.entity';
import { Repository } from 'typeorm';
import { MedicalOrderMedicineDto } from '../../../common/dtos/medical-order-medicine.dto';
import { MedicalOrder } from '../../../common/entities/medical-order.entity';
import { MedicineService } from '../../../modules/medicine/service/medicine.service';

@Injectable()
export class MedicalOrderMedicineService {
  constructor(
    @InjectRepository(MedicalOrderMedicine)
    private readonly medicalOrderMedicineRepository: Repository<MedicalOrderMedicine>,
    private medicineService: MedicineService
  ) {}

  async findAll(): Promise<MedicalOrderMedicine[]> {
    return await this.medicalOrderMedicineRepository.find();
  }

  async createMedicalOrderMedicine(order: MedicalOrder, medicines: number[]) {
    for (const medicine of medicines) {
      const medicineDB = await this.medicineService.findOne(medicine);
      const medicalOrderMedicine = this.medicalOrderMedicineRepository.create({
        order,
        medicine: medicineDB
      });

      await this.medicalOrderMedicineRepository.save(medicalOrderMedicine);
    }
  }

  async updateMedicalOrderMedicine(
    id: number,
    medicalOrderMedicineDto: MedicalOrderMedicineDto,
    medicalOrder: MedicalOrder
  ): Promise<MedicalOrderMedicine> {
    const medicalOrderMedicine =
      await this.medicalOrderMedicineRepository.findOne({ where: { id } });

    if (
      medicalOrderMedicineDto.medicineId !==
      medicalOrderMedicine.medicine.medicineId
    ) {
      const medicine = await this.medicineService.findOne(
        medicalOrderMedicineDto.medicineId
      );
      const newMedicine = new MedicalOrderMedicine();
      newMedicine.order = medicalOrder;
      newMedicine.medicine = medicine;

      return this.medicalOrderMedicineRepository.save(newMedicine);
    }

    return this.medicalOrderMedicineRepository.save(medicalOrderMedicine);
  }

  async deleteMedicalOrderMedicine(id: number): Promise<void> {
    await this.findMedicalOrderMedicineById(id);
    await this.medicalOrderMedicineRepository.delete(id);
  }

  async findMedicalOrderMedicineById(
    id: number
  ): Promise<MedicalOrderMedicine> {
    const medicalOrderMedicine = this.medicalOrderMedicineRepository.findOneBy({
      id
    });

    if (!medicalOrderMedicine) {
      throw new NotFoundException(
        `Medical Order Medicine with ID ${id} not found`
      );
    }

    return medicalOrderMedicine;
  }

  async findMedicalOrderMedicineByMedicalOrderId(
    id: number
  ): Promise<MedicalOrderMedicine> {
    const medicalOrderMedicine =
      await this.medicalOrderMedicineRepository.findOneBy({
        order: {
          orderId: id
        }
      });

    if (!medicalOrderMedicine) {
      throw new NotFoundException(
        `Medical Order Medicine with medical order ID ${id} not found`
      );
    }

    return medicalOrderMedicine;
  }
}

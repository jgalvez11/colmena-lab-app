import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalOrder } from '../../../common/entities/medical-order.entity';
import { AppointmentService } from '../../../modules/appointment/service/appointment.service';
import { SpecialtyService } from '../../../modules/specialty/service/specialty.service';
import { DataSource, Repository } from 'typeorm';
import { MedicalOrderDto } from '../../../common/dtos/medical-order.dto';
import { MedicalOrderMedicineService } from '../../../modules/medical-order-medicine/service/medical-order-medicine.service';

@Injectable()
export class MedicalOrderService {
  constructor(
    @InjectRepository(MedicalOrder)
    private medicalOrderRepository: Repository<MedicalOrder>,
    private appointmentService: AppointmentService,
    private specialtyService: SpecialtyService,
    private medicalOrderMedicineService: MedicalOrderMedicineService,
    private dataSource: DataSource
  ) {}

  async findAll(): Promise<MedicalOrder[]> {
    return await this.medicalOrderRepository.find();
  }

  async findOne(orderId: number): Promise<MedicalOrder> {
    const order = await this.medicalOrderRepository.findOne({
      where: { orderId }
    });

    if (!order) {
      throw new NotFoundException(`Medical Order with ID ${orderId} not found`);
    }

    return order;
  }

  async create(medicalOrderDto: MedicalOrderDto): Promise<MedicalOrder> {
    const appointment = await this.appointmentService.findOne(
      medicalOrderDto.appointmentId
    );

    const specialty = await this.specialtyService.findOne(
      medicalOrderDto.specialtyId
    );

    const medicalOrder = this.medicalOrderRepository.create({
      appointment,
      specialty,
      description: medicalOrderDto.description,
      expirationDate: medicalOrderDto.expirationDate
    });

    const createdOrder = await this.medicalOrderRepository.save(medicalOrder);

    await this.medicalOrderMedicineService.createMedicalOrderMedicine(
      createdOrder,
      medicalOrderDto.medicines
    );

    return createdOrder;
  }

  async update(
    orderId: number,
    medicalOrderDto: MedicalOrderDto
  ): Promise<MedicalOrder> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const medicalOrder = await this.findOne(orderId);
      medicalOrder.description = medicalOrderDto.description;
      medicalOrder.expirationDate = medicalOrderDto.expirationDate;

      if (
        medicalOrderDto.appointmentId !== medicalOrder.appointment.appointmentId
      ) {
        const appointment = await this.appointmentService.findOne(
          medicalOrderDto.appointmentId
        );
        medicalOrder.appointment = appointment;
      }

      if (medicalOrderDto.specialtyId !== medicalOrder.specialty.specialtyId) {
        const specialty = await this.specialtyService.findOne(
          medicalOrderDto.specialtyId
        );
        medicalOrder.specialty = specialty;
      }

      const medicalOrderMedicine =
        await this.medicalOrderMedicineService.findMedicalOrderMedicineByMedicalOrderId(
          orderId
        );

      for (const medicine of medicalOrderDto.medicines) {
        await this.medicalOrderMedicineService.updateMedicalOrderMedicine(
          medicalOrderMedicine.id,
          {
            medicalOrderId: orderId,
            medicineId: medicine
          },
          medicalOrder
        );
      }

      const medicalOrderSave = this.medicalOrderRepository.save(medicalOrder);
      await queryRunner.commitTransaction();

      return medicalOrderSave;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(orderId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const medicalOrder = await this.findOne(orderId);
      for (const medicalOrderMedicine of medicalOrder.medicalOrderMedicines) {
        await this.medicalOrderMedicineService.deleteMedicalOrderMedicine(
          medicalOrderMedicine.id
        );
      }

      await this.medicalOrderRepository.delete(orderId);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }
}

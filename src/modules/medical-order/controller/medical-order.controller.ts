import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete
} from '@nestjs/common';
import { MedicalOrderService } from '../service/medical-order.service';
import { MedicalOrderDto } from '../../../common/dtos/medical-order.dto';
import { MedicalOrder } from '../../../common/entities/medical-order.entity';

@Controller('medical-order')
export class MedicalOrderController {
  constructor(private readonly medicalOrderService: MedicalOrderService) {}

  @Get()
  async findAll(): Promise<MedicalOrder[]> {
    return this.medicalOrderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MedicalOrder> {
    return this.medicalOrderService.findOne(id);
  }

  @Post()
  async create(
    @Body() medicalOrderDto: MedicalOrderDto
  ): Promise<MedicalOrder> {
    return this.medicalOrderService.create(medicalOrderDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() medicalOrderDto: MedicalOrderDto
  ): Promise<MedicalOrder> {
    return this.medicalOrderService.update(id, medicalOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.medicalOrderService.remove(id);
  }
}

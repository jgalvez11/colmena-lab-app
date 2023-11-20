import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete
} from '@nestjs/common';
import { MedicineService } from '../service/medicine.service';
import { Medicine } from '../../../common/entities/medicine.entity';
import { MedicineDto } from '../../../common/dtos/medicine.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  async findAll(): Promise<Medicine[]> {
    return this.medicineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Medicine> {
    return this.medicineService.findOne(id);
  }

  @Post()
  async create(@Body() medicineDto: MedicineDto): Promise<Medicine> {
    return this.medicineService.create(medicineDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() medicineDto: MedicineDto
  ): Promise<Medicine> {
    return this.medicineService.update(id, medicineDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.medicineService.remove(id);
  }
}

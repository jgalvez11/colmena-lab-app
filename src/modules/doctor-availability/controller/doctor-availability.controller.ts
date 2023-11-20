import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete
} from '@nestjs/common';
import { DoctorAvailabilityService } from '../service/doctor-availability.service';
import { DoctorAvailability } from '../../../common/entities/doctor-availability.entity';
import { DoctorAvailabilityDto } from '../../../common/dtos/doctor-availability.dto';

@Controller('doctor-availability')
export class DoctorAvailabilityController {
  constructor(
    private readonly doctorAvailabilityService: DoctorAvailabilityService
  ) {}

  @Get()
  async findAll(): Promise<DoctorAvailability[]> {
    return this.doctorAvailabilityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DoctorAvailability> {
    return this.doctorAvailabilityService.findOne(id);
  }

  @Post()
  async create(
    @Body() doctorAvailabilityDto: DoctorAvailabilityDto
  ): Promise<DoctorAvailability> {
    return this.doctorAvailabilityService.create(doctorAvailabilityDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() doctorAvailabilityDto: DoctorAvailabilityDto
  ): Promise<DoctorAvailability> {
    return this.doctorAvailabilityService.update(id, doctorAvailabilityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.doctorAvailabilityService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import { DoctorService } from '../service/doctor.service';
import { Doctor } from '../../../common/entities/doctor.entity';
import { DoctorDto } from '../../../common/dtos/doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorsService: DoctorService) {}

  @Get()
  async findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Doctor> {
    return this.doctorsService.findOne(id);
  }

  @Post()
  async create(@Body() doctorDto: DoctorDto): Promise<Doctor> {
    return this.doctorsService.create(doctorDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() doctorDto: DoctorDto
  ): Promise<Doctor> {
    return this.doctorsService.update(id, doctorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.doctorsService.remove(id);
  }
}

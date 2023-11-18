import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import { PatientService } from '../service/patient.service';
import { Patient } from '../../../common/entities/patient.entity';
import { PatientDto } from '../../../common/dtos/patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientsService: PatientService) {}

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Patient> {
    return this.patientsService.findOne(id);
  }

  @Post()
  async create(@Body() patientDto: PatientDto): Promise<Patient> {
    return this.patientsService.create(patientDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() patientDto: PatientDto
  ): Promise<Patient> {
    return this.patientsService.update(id, patientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.patientsService.remove(id);
  }
}

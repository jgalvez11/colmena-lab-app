import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete
} from '@nestjs/common';
import { SpecialtyService } from '../service/specialty.service';
import { Specialty } from 'src/common/entities/specialty.entity';
import { SpecialtyDto } from 'src/common/dtos/specialty.dto';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Get()
  async findAll(): Promise<Specialty[]> {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Specialty> {
    return this.specialtyService.findOne(id);
  }

  @Post()
  async create(@Body() specialtyDto: SpecialtyDto): Promise<Specialty> {
    return this.specialtyService.create(specialtyDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() specialtyDto: SpecialtyDto
  ): Promise<Specialty> {
    return this.specialtyService.update(id, specialtyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.specialtyService.remove(id);
  }
}

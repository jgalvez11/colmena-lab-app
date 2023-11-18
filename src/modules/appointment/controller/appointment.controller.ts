import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import { AppointmentService } from '../service/appointment.service';
import { AppointmentDto } from 'src/common/dtos/appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appointmentService.findOne(id);
  }

  @Post()
  create(@Body() appointmentDto: AppointmentDto) {
    return this.appointmentService.create(appointmentDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() appointmentDto: AppointmentDto) {
    return this.appointmentService.update(id, appointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appointmentService.remove(id);
  }
}

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
import { AppointmentDto } from '../../../common/dtos/appointment.dto';

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

  @Get('by-identification/:id')
  findOneByIdentification(@Param('id') id: string) {
    return this.appointmentService.findByIdentification(id);
  }

  @Get('by-date/:date')
  findOneByDate(@Param('date') date: Date) {
    return this.appointmentService.findByDate(date);
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

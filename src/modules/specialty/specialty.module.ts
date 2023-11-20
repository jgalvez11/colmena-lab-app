import { Module } from '@nestjs/common';
import { SpecialtyController } from './controller/specialty.controller';
import { SpecialtyService } from './service/specialty.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from '../../common/entities/specialty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialty])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
  exports: [TypeOrmModule, SpecialtyService]
})
export class SpecialtyModule {}

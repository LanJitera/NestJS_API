import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/utils/repository';
import { PartybookingService } from './partybookings.service';
import { PartybookingController } from './partybookings.controller';
import { PartybookingRepository } from './partybookings.repository';
import { Partybooking } from '@entities/partybookings';

@Module({
  imports: [TypeOrmModule.forFeature([Partybooking])],
  providers: [provideCustomRepository(Partybooking, PartybookingRepository), PartybookingService],
  controllers: [PartybookingController],
})
export class PartybookingModule {}

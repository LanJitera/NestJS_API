import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Partybooking } from '@entities/partybookings';

@Injectable()
export class PartybookingRepository extends BaseRepository<Partybooking> {}

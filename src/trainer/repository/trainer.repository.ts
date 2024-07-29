import { Injectable, Logger } from '@nestjs/common';
import { TrainerDocument } from '../modal/trainer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/mongodb';

@Injectable()
export class TrainerRepository extends AbstractRepository<TrainerDocument> {
  protected readonly logger = new Logger(TrainerRepository.name);

  constructor(
    @InjectModel(TrainerDocument.name) trainerModal: Model<TrainerDocument>,
  ) {
    super(trainerModal);
  }
}

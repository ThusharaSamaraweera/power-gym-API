import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/mongodb';
import { BodyHealthInfoDocument } from '../modal';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BodyHealthInfoRepository extends AbstractRepository<BodyHealthInfoDocument> {
  protected readonly logger = new Logger(BodyHealthInfoRepository.name);

  constructor(
    @InjectModel(BodyHealthInfoDocument.name)
    bodyHealthInfoModel: Model<BodyHealthInfoDocument>,
  ) {
    super(bodyHealthInfoModel);
  }
}

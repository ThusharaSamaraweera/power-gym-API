import { Injectable } from '@nestjs/common';
import { ProgressRecordDocument } from './modal/progress-record.schema';
import { Model, Types } from 'mongoose';
import { CreateProgressRecordDto } from './dto/create-progress-record.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProgressRecordService {
  constructor(
    @InjectModel(ProgressRecordDocument.name)
    private progressRecordModel: Model<ProgressRecordDocument>,
  ) {}

  async createProgressRecord(
    progressRecord: CreateProgressRecordDto,
    memberId: Types.ObjectId,
  ) {
    const createdProgressRecord = await this.progressRecordModel.create({
      memberId: memberId,
      progressRecord: progressRecord.progressRecord,
      note: progressRecord?.note,
      verifiedBy: progressRecord?.verifiedBy,
    });

    return createdProgressRecord;
  }

  async getProgressRecordByMemberId(memberId: Types.ObjectId) {
    return await this.progressRecordModel.find({ memberId: memberId });
  }
}

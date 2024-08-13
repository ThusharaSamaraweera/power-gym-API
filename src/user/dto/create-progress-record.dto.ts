import { ApiProperty } from '@nestjs/swagger';
import { ProgressRecord } from '../types';

export class CreateProgressRecordDto {
  @ApiProperty({
    required: true,
  })
  progressRecord: ProgressRecord;

  @ApiProperty({
    required: false,
  })
  note: string;

  @ApiProperty({
    required: false,
  })
  verifiedBy: string;
}

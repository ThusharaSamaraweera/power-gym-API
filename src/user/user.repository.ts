import { Injectable, Logger } from '@nestjs/common';
import { UserDocument } from './modal/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/database/mongodb';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(UserDocument.name) userModal: Model<UserDocument>) {
    super(userModal);
  }
}

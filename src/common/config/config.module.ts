import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
        GPT4_API_KEY: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

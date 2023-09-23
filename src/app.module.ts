import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common';
import { ConfigModule } from './common/config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './common/database/mongodb';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [LoggerModule, ConfigModule, AuthModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

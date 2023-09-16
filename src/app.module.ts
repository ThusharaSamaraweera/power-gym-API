import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [LoggerModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

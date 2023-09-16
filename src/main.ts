import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
  });
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will remove any properties that are not in the DTO
      transform: true, // This will transform the incoming data to the DTO type
      transformOptions: {
        enableImplicitConversion: true, // This will convert the incoming data to the type specified in the DTO
      },
    }),
  );
  const port = process.env.PORT || 8080;
  await app.listen(port, () => {
    console.log(`🚀 Listening at http://localhost:${port}`);
  });
}
bootstrap();

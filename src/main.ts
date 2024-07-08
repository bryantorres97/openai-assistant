import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/constants';
import { initSwagger } from './app.swagger';

async function main() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = app.get(ConfigService);
  const port = config.get<number>(PORT);

  initSwagger(app, 'Assistant API', 'API Documentation for OpenAI Assistant');
  await app.listen(port);

  logger.log(`Server running on http://localhost:${port}`);
  logger.log(`Swagger running on http://localhost:${port}/docs`);
}
main();

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ExceptionFilter, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@filters/allExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT', 4000);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalFilters(new AllExceptionsFilter() as ExceptionFilter);

  await app.listen(port);
  console.log(`Application is running on PORT: ${port}`);
}

bootstrap();

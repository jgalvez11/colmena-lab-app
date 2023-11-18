import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { configService } from './config/config.service';
import { SwaggerConfig } from './config/swagger.config';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './common/exceptions/validation-filter.exception';

configDotenv();

async function bootstrap() {
  const PORT_NUMBER = process.env['PORT'] || 3000;
  const app = await NestFactory.create(AppModule);

  if (!configService.isProduction()) {
    SwaggerConfig.setupSwagger(app);
  }

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) =>
        new HttpException(errors, HttpStatus.BAD_REQUEST)
    })
  );

  // Global exception filter
  app.useGlobalFilters(new ValidationExceptionFilter());

  await app
    .listen(PORT_NUMBER)
    .then(() => console.log('App is runnning in port: ' + PORT_NUMBER));
}
bootstrap();

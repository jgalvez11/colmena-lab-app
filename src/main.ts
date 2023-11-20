import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { configService } from './config/config.service';
import { SwaggerConfig } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

configDotenv();

async function bootstrap() {
  const PORT_NUMBER = process.env['PORT'] || 3000;
  const app = await NestFactory.create(AppModule);

  if (!configService.isProduction()) {
    SwaggerConfig.setupSwagger(app);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT_NUMBER).then(
    () => console.log('App is runnning in port: ' + PORT_NUMBER),
    (err) => {
      console.log('Not connect DB: ');
      console.log(err);
      console.log(PORT_NUMBER);
      
    }
  );
}
bootstrap();

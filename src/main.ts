import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';

configDotenv();

async function bootstrap() {
  const PORT_NUMBER = process.env['PORT'] || 3000;
  const app = await NestFactory.create(AppModule);
  await app
    .listen(PORT_NUMBER)
    .then(() => console.log('App is runnning in port: ' + PORT_NUMBER));
}
bootstrap();

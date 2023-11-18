import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  static setupSwagger(app: INestApplication): void {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Colmena Lab API')
        .setDescription(
          'El hospital ColmenaLab requiere un microservicio que permita gestionar algunos procesos internos de la institución a través de un API'
        )
        .build()
    );

    SwaggerModule.setup('swagger/docs', app, document);
  }
}

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import helmet from 'helmet';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: string = config.get<string>('PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(helmet());
  app.enableCors();

  const configD = new DocumentBuilder()
    .setTitle('DMS API')
    .setDescription('The DMS API description')
    .setVersion('1.0')
    .addTag('Auth')
    .build();
  const document = SwaggerModule.createDocument(app, configD);
  SwaggerModule.setup('api', app, document);

  const ehs = new DocumentBuilder()
    .setTitle('EHS')
    .setDescription('The EHS API description')
    .setVersion('1.0')
    .addTag('EHS')
    .build();
  const documentEhs = SwaggerModule.createDocument(app, ehs);
  SwaggerModule.setup('ehs', app, documentEhs);

  app.listen(parseInt(port) || 3000);
}

bootstrap();

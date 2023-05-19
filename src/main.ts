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
  app.setGlobalPrefix('api/v1');

  const configD = new DocumentBuilder()
    .setTitle('Finance Control FT')
    .setDescription(
      'Finance Control FT is a project to control your finances, with this project you can control your expenses and incomes.',
    )
    .setVersion('1.0')
    .addTag('Finance Control FT')
    .addTag('Auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configD);
  SwaggerModule.setup('api', app, document);

  app.listen(parseInt(port) || 3000);
}

bootstrap();

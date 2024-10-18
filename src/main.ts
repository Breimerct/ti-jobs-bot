import * as express from 'express';
import * as serverless from 'serverless-http';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('TI JOBS BOT')
    .setDescription('The TI JOBS BOT API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/doc', app, document);

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/') {
      res.redirect('/api/v1/doc');
    } else {
      next();
    }
  });

  app
    .listen(PORT)
    .then(() => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })
    .catch((error) => {
      console.error(`Error starting server: ${error.message}`);
    });

  return server;
}

bootstrap();

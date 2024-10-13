import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

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

  await app
    .listen(PORT)
    .then(() => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })
    .catch((error) => {
      console.error(`Error starting server: ${error.message}`);
    });
}
bootstrap();

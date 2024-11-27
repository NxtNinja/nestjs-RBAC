import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'supersecret', // Use environment variable
      resave: false,
      saveUninitialized: false,
      name: 'session',
      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 3600000,
        sameSite: 'none',
      },
    })
  );

  app.enableCors({
    origin: 'https://rbac-nextjs-ry8w2.ondigitalocean.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

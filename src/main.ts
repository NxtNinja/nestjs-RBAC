import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      name: 'session',
      secret: 'supersecret',
      cookie: {
        secure:true,
        httpOnly: true, // To prevent client-side JS from accessing the cookie
        maxAge: 3600000, // 
        
      },
    }),
  );

  app.enableCors({
    origin: 'https://rbac-nextjs-ry8w2.ondigitalocean.app',
    credentials: true,
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

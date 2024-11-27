import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as SQLiteStore from 'connect-sqlite3';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const SQLiteSessionStore = SQLiteStore(session);

  app.use(
    session({
      store: new SQLiteSessionStore({
        db: 'sessions.sqlite',  // SQLite database file for sessions
        dir: './',               // Directory where the file will be stored
      }),
      resave: false,
      saveUninitialized: false,
      name: 'session',
      secret: 'supersecret',
      cookie: {
        secure:true,
        sameSite: "none",
        maxAge: 3600000
      },
      proxy: true, // Important for secure cookies behind a proxy
    }),
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

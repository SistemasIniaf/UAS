import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  console.log('🔍 Variables cargadas:');
console.log('PORT:', configService.get('PORT'));
console.log('NODE_ENV:', configService.get('NODE_ENV'));
console.log('API_PREFIX:', configService.get('API_PREFIX'));
console.log('JWT_SECRET:', configService.get('JWT_SECRET') ? '✅ cargado' : '❌ no encontrado');
console.log('DB_HOST:', configService.get('DB_HOST'));
console.log('DB_DATABASE:', configService.get('DB_DATABASE'));

// 👇 ESTE ES EL IMPORTANTE
console.log('DB_PASSWORD:', configService.get('DB_PASSWORD'));

// opcional (más seguro, sin mostrar el valor real)
console.log(
  'DB_PASSWORD existe:',
  configService.get('DB_PASSWORD') ? '✅ sí' : '❌ no'
);

  // Global prefix para todas las rutas
  const apiPrefix = configService.get<string>('API_PREFIX') || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Validation pipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS
  const corsOrigin =
    configService.get<string>('CORS_ORIGIN') || 'http://localhost:3001';

  const allowedOrigins = corsOrigin
    ? corsOrigin.split(',').map((origin) => origin.trim())
    : ['http://localhost:3001'];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Puerto
  const port = parseInt(configService.get<string>('PORT') ?? '3001', 10);
  await app.listen(port);

  console.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
  console.log(`📚 API Prefix: ${apiPrefix}`);
  console.log(`🌍 Entorno: ${configService.get<string>('NODE_ENV')}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não definidas no DTO
      forbidNonWhitelisted: true,
      transform: true, // transforma JSON em instância do DTO
      stopAtFirstError: true, // opcional: para na primeira falha de validação
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

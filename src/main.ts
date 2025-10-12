import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      //stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((err) => {
          if (err.children && err.children.length) {
            // percorre propriedades aninhadas
            return err.children.flatMap((child) =>
              Object.values(child.constraints || {}),
            );
          }
          return Object.values(err.constraints || {});
        });
        return new BadRequestException(messages);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

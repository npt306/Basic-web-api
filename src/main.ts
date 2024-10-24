import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // remove any extra properties that are not in the DTO
      forbidNonWhitelisted:true, // throw an error if extra properties are found
      transform : true, // transform the payload to the DTO type
    }
  ));
  await app.listen(3000);
}
bootstrap();

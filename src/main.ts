import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // remove any extra properties that are not in the DTO
      forbidNonWhitelisted:true, // throw an error if extra properties are found
      transform : true, // transform the payload to the DTO type
    }
  ));

  const config = new DocumentBuilder()
    .setTitle('Basic web api')
    .setDescription('The basic web api description')
    .setVersion('1.0')
    .addTag('Actors')
    .addTag('Films')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(3000);
}
bootstrap();

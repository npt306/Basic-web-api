import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorsModule } from './actors/actors.module';
import {MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from './films/films.module';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerService } from './logging/logger.service';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sakila'),
    ActorsModule,
    FilmsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

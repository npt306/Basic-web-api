import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorsModule } from './actors/actors.module';
import {MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from './films/films.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sakila'),
    ActorsModule,
    FilmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

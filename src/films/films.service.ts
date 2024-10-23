import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>){}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const createdFilmDto = new this.filmModel(createFilmDto)
    return createdFilmDto.save();
  }

  async findAll(): Promise<Film[]> { 
    return this.filmModel.find().exec();
  }

  async findOne(id: string) {
    return this.filmModel.findById(id).exec();
  }


  async update(id: string, updateFilmDto: UpdateFilmDto): Promise<Film> {
    return this.filmModel.findByIdAndUpdate(id, updateFilmDto, {new: true}).exec();
  }

  async remove(id: string): Promise<Film> {
    return this.filmModel.findByIdAndDelete(id).exec();
  }
}

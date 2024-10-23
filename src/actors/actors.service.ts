import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor, ActorDocument} from './schemas/actor.schema'

@Injectable()
export class ActorsService {
  constructor(@InjectModel(Actor.name) private actorModel: Model<ActorDocument>){}

  async create(createActorDto: CreateActorDto): Promise<Actor> {
    const createdActorDto = new this.actorModel(createActorDto);
    return createdActorDto.save();
  }

  async findAll(): Promise<Actor[]>{
    return this.actorModel.find().exec();
  }

  async findOne(id: string): Promise<Actor> {
    return this.actorModel.findById(id).exec();
  }

  async findOneByActorId(actor_id: number): Promise<Actor>{
    return this.actorModel.findOne({actor_id: actor_id}).exec()
  }

  async update(id: string, updateActorDto: UpdateActorDto): Promise<Actor> {
    return this.actorModel.findByIdAndUpdate(id, updateActorDto, {new: true}).exec();
  }

  async remove(id: string): Promise<Actor> {
    return this.actorModel.findByIdAndDelete(id).exec();
  }
}

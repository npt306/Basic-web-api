import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const createdUserDto = new this.userModel(createUserDto)
        return createdUserDto.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOneById(id: string): Promise<UserDocument | undefined> {
        return this.userModel.findById(id).exec();
    }

    async findByUsername(username: string): Promise<UserDocument | undefined> {
        return this.userModel.findOne({ username }).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User | undefined> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async remove(id: string): Promise<UserDocument | undefined> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}

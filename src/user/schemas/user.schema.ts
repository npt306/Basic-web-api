import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export class User {
    @Prop()
    user_id: number;

    @Prop()
    username: string;
    
    @Prop()
    email: string;
    
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
import {Prop , Schema, SchemaFactory} from '@nestjs/mongoose'
import {HydratedDocument} from 'mongoose'

export type ActorDocument = HydratedDocument<Actor>

@Schema()
export class Actor{
    @Prop()
    actor_id: number;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    last_update:Date;
}

export const ActorSchema = SchemaFactory.createForClass(Actor)
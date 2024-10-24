import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Film{
    @Prop({unique: true})
    film_id: number;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    release_year: string;

    @Prop()
    language_id: number;

    @Prop()
    original_language_id: number;

    @Prop()
    retal_duration: number;

    @Prop()
    rental_rate: number;

    @Prop()
    length: number;

    @Prop()
    replacement_cost: number;

    @Prop()
    rating: string;

    @Prop()
    special_features: string;

    @Prop()
    last_update: Date;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
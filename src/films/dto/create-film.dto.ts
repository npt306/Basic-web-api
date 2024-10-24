import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFilmDto {
    @IsNumber()
    film_id: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    release_year: string;

    @IsNumber()
    language_id: number;

    @IsNumber()
    original_language_id: number;

    @IsNumber()
    rental_duration: number;

    @IsNumber()
    rental_rate: number;

    @IsNumber()
    length: number;

    @IsNumber()
    replacement_cost: number;

    @IsString()
    rating: string;

    @IsString()
    special_features: string;

    @IsString()
    last_update: Date;
}

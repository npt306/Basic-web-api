import { IsNotEmpty, IsNumber, IsString, Max, Min, IsDateString, IsOptional} from "class-validator";

export class CreateFilmDto {
    @IsNumber()
    @IsNotEmpty({message: 'Film ID cannot be empty'})
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
    @Max(5, {message: 'Rental rate cannot be more than 5'})
    @Min(0, {message: 'Rental rate cannot be less than 0'})
    rental_rate: number;

    @IsNumber()
    length: number;

    @IsNumber()
    replacement_cost: number;

    @IsString()
    rating: string;

    @IsString()
    special_features: string;

    @IsDateString()
    last_update: Date;
}

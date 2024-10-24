import { IsNotEmpty, IsNumber, IsString, Max, Min, IsDateString, IsOptional} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
    @IsNumber()
    @IsNotEmpty({message: 'Film ID cannot be empty'})
    @ApiProperty({type: Number, description: 'Film ID', example: 1})
    film_id: number;

    @IsString()
    @ApiProperty({type: String, description: 'Title of the film', example: 'ACADEMY DINOSAUR'})
    title: string;

    @IsString()
    @ApiProperty({type: String, description: 'Description of the film', example: 'A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies'})
    description: string;

    @IsString()
    @ApiProperty({type: String, description: 'Release year of the film', example: '2006'})
    release_year: string;

    @IsNumber()
    @ApiProperty({type: Number, description: 'Language ID of the film', example: 1})
    language_id: number;

    @IsNumber()
    @ApiProperty({type: Number, description: 'Original language ID of the film', example: 0})
    original_language_id: number;

    @IsNumber()
    @ApiProperty({type: Number, description: 'Rental duration of the film', example: 6})
    rental_duration: number;

    @IsNumber()
    @ApiProperty({type: Number, description: 'Rental rate of the film', example: 0.99})
    @Max(5, {message: 'Rental rate cannot be more than 5'})
    @Min(0, {message: 'Rental rate cannot be less than 0'})
    rental_rate: number;

    @IsNumber()
    @ApiProperty({type: Number, description: 'Length of the film', example: 86})
    length: number;

    @IsNumber()
    @ApiProperty({type: Number, description: 'Replacement cost of the film', example: 20.99})
    replacement_cost: number;

    @IsString()
    @ApiProperty({type: String, description: 'Rating of the film', example: 'PG'})
    rating: string;

    @IsString()
    @ApiProperty({type: String, description: 'Special features of the film', example: 'Deleted Scenes, Behind the Scenes'})
    special_features: string;

    @IsDateString()
    @ApiProperty({type: Date, description: 'Last update of the film', example: '2006-02-15 05:03:42'})
    last_update: Date;
}

export class CreateFilmDto {
    film_id: number;
    title: string;
    description: string;
    release_year: string;
    language_id: number;
    original_language_id: number;
    retal_duration: number;
    rental_rate: number;
    length: number;
    replacement_cost: number;
    rating: string;
    speacial_features: string;
    last_update: Date;
}

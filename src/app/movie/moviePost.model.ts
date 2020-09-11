import { Movie } from './movie.model';

export class MoviePost{
      page:number;
        results:Movie[];
        total_results:number;
        total_pages:number;
}
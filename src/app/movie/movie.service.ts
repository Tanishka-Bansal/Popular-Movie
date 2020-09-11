import { Movie } from './movie.model';
import { MoviePost } from './moviePost.model';

export class MovieService{
    content:MoviePost;
    current:Movie;

    getMovie(index:number){
        return this.content.results[index];
    }

    setMovie(index:number){
        this.current=this.content.results[index];
    }
}
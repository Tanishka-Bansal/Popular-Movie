import { Component, OnInit , Output , EventEmitter } from '@angular/core';

import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html'
//   styleUrls: ['./recipe-list.component.css']
})
export class MovieListComponent implements OnInit{
    posts:Movie[];
	constructor(public movieService:MovieService){}	

    ngOnInit(){
        // this.posts=this.movieService.content.results;
    }

}

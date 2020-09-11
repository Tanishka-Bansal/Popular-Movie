import { Component, OnInit } from '@angular/core';
import { MoviePostService } from './movie-post.service';
import { MovieService } from './movie.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
//hi
  constructor(public moviePost: MoviePostService , public movieService:MovieService) {}

  ngOnInit(){
    this.moviePost.getPosts().subscribe(data=>{
      this.movieService.content=data;
    });
  }

}

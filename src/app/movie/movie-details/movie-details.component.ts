import { Component, OnInit , DoCheck} from '@angular/core';
import { MoviePostService } from '../movie-post.service';
import { MovieService} from '../movie.service'; 
import { Movie} from '../movie.model'; 
import { ActivatedRoute , Router , Params } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements DoCheck , OnInit{
 movie:Movie;
 id:number;  
 path:string;

 constructor(public movieService:MovieService, private moviePostService:MoviePostService ,
            private route: ActivatedRoute , private router:Router ){}	
	  

  ngDoCheck(): void {
    this.route.params.subscribe((params:Params)=>{
        this.id=+params['id'];
        this.movie=this.movieService.getMovie(this.id);
        this.path='https://image.tmdb.org/t/p/w500/'+this.movie.poster_path;
        const data=JSON.stringify(this.movie);
        localStorage.setItem('movie',data);
          
  });

}

ngOnInit(){
 const data=JSON.parse(localStorage.getItem('movie'));
 console.log(data);
 this.movie=data;
}
closeIt(){
    this.router.navigate(['../'],{relativeTo:this.route})
}
}

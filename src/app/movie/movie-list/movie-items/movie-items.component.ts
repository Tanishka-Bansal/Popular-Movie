import { Input , Component, OnInit , Output , EventEmitter, DoCheck } from '@angular/core';
import { Movie } from '../../movie.model';
import { MovieService } from '../../movie.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-items',
  templateUrl: './movie-items.component.html',
  styleUrls: ['./movie-items.component.css']
})

export class MovieItemsComponent implements OnInit , DoCheck {
  // @Output() recipeClicked= new EventEmitter<(Recipe)>();
  @Input() movie:Movie;
  @Input() index:number;
  title:string;
  path:string;


  constructor(public movieService:MovieService,
               private router:Router,
               private route:ActivatedRoute
               ){
  }  
  
  ngOnInit(): void {
      this.movieService.getMovie(this.index);
  }

  changeTitle(){
      if(this.movie.original_title.length>30){
        this.title=this.movie.original_title.substr(0,30)+'...';
      }
      else{
          this.title=this.movie.original_title;
      }
  }

  ngDoCheck(){
      if(this.movie){
        this.changeTitle();
        this.path='https://image.tmdb.org/t/p/w500/'+this.movie.poster_path;
      }
  }

  activateIt(){
      this.movieService.setMovie(this.index);
      
  }

}

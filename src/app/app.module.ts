import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MovieComponent } from './movie/movie.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';


import { MovieService } from './movie/movie.service';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieItemsComponent } from './movie/movie-list/movie-items/movie-items.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    MovieComponent,
   
    HeaderComponent ,
 
    AuthComponent,

    MovieListComponent,
    MovieItemsComponent
    ],
  
    imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   AppRoutingModule  
  
  ],
  providers: [MovieService
               ],
  bootstrap: [AppComponent]
})
export class AppModule { }

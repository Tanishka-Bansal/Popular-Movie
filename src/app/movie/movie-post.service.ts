import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviePost } from './moviePost.model';

@Injectable({providedIn:'root'})

export class MoviePostService{

    constructor(private client:HttpClient){}

    getPosts(){
        return this.client.get<MoviePost>(
            'https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1');
    }
}
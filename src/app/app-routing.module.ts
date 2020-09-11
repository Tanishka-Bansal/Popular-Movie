import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieComponent } from './movie/movie.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [

{path:'movie', component:MovieComponent, canActivate:[AuthGuard], children:[
	{path:':id', component:MovieDetailsComponent}
]},
{path:'auth', component: AuthComponent},
{path:'', redirectTo:'auth', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

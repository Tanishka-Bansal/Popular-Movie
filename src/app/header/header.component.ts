import { Component, OnInit , Output , EventEmitter, OnDestroy} from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  
  isAuthenticated:boolean=false;
  authSubscription:Subscription;

  constructor( private authService:AuthService , private router:Router){ }

  ngOnInit(){
    this.authSubscription = this.authService.userData.subscribe(data=>{
      this.isAuthenticated= !data? false : true;
      if(!this.isAuthenticated)
      {
        this.router.navigate(['/auth']);
      }
   
    });
  }

  
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}

import {Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap , take} from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User} from './user.model';
import { Router } from '@angular/router';
 
interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;	
    registered:boolean;
}

@Injectable({ providedIn:'root'})

export class AuthService{
    userData=new BehaviorSubject<User>(null);
    
    constructor(private client: HttpClient , private router:Router){}

    signup( email:string, password:string ){
     return  this.client.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAM3GP4HyPD4u3KIA_F65mQpz90MFj2zjc',
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(catchError(this.handleError),
        tap(resData=>{this.handleAuthentication(resData);}))
    }

    signIn(email:string , password: string)
    {
        return this.client.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAM3GP4HyPD4u3KIA_F65mQpz90MFj2zjc',
                {
                    email:email,
                    password:password,
                    returnSecureToken:true
                })
                .pipe(catchError(this.handleError),
                    tap(resData=>{this.handleAuthentication(resData);}))
    }

    autoLogin(){
      const data:{
            email:string,
            id:string,
            _token:string,
            _token_expiration_date:string
        }=JSON.parse(localStorage.getItem('userData'));
        
        if(!data)
           return;

        const user=new User(
        data.email,
        data.id,
        data._token,
        new Date(data._token_expiration_date));
        
        if(user.token)
        {     this.userData.next(user);
              let expTime:number=new Date(data._token_expiration_date).getTime()- new Date().getTime();
              this.autoLogout(expTime);
         }    
    }

    logOut(){
        this.userData.next(null);
        localStorage.removeItem('userData');
    }
    
    autoLogout(expirationTime:number){
        setTimeout(()=>this.logOut(),expirationTime);
    }

    private handleAuthentication(resData:AuthResponseData){
        let expiration:Date= new Date(new Date().getTime() + +resData.expiresIn*1000);
        let email=resData.email;
        let userId=resData.localId;
        let token=resData.idToken;
        let userData=new User(email,userId,token,expiration);
        this.userData.next(userData);
        this.userData.pipe(take(1)).subscribe(dt=>console.log(dt));
        this.autoLogout(+resData.expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(userData));
    }

    private handleError(errorRes:HttpErrorResponse){ 
        console.log(errorRes);
        let error='An unknown error occured';
        if(!errorRes.error || !errorRes.error.error){
        return throwError(error);
        };
        switch(errorRes.error.error.message){
            case 'EMAIL_NOT_FOUND': error='There is no user record with this email.';break;
            case 'INVALID_PASSWORD': error='The password is invalid.'; break;
            case 'USER_DISABLED': error='The user account has been disabled by an administrator.';break; 
            case 'EMAIL_EXISTS': error=' The email address already exists.' ; break;
            case 'OPERATION_NOT_ALLOWED': error='Password sign-in is disabled for this project.';break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER': error='Too Many Attempts. Try again later.';break;
            default:error='An unknown error occured';break;   
        }
        return throwError(error);
    }
    }


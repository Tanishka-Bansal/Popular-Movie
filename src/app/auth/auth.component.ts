import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector:'auth-component',
    templateUrl:'./auth.component.html'
})

export class AuthComponent{
    isSigninMode=true;
    isLoading=false;
    error:string=null;
 
    constructor(
        private authService: AuthService ,
        private router:Router, 
        private ComponentFactoryResolver: ComponentFactoryResolver
        ){}

    onSwitch(){
        this.isSigninMode=!this.isSigninMode;
    }

    onSubmit(form: NgForm){
        let authObs:Observable<any>;
        if(!form.valid)
            return;
        if(!this.isSigninMode)
             authObs=this.authService.signup(form.value.email,form.value.password);
        else
             authObs=this.authService.signIn(form.value.email, form.value.password);
       
        this.isLoading=true;
        this.error='';  
        authObs.subscribe(
            data=>{
                console.log(data);
                this.isLoading=false;
                this.router.navigate(['/movie']);
            },errorMes=>{
                
                this.error=errorMes;
            
                this.isLoading=false;
            })
        form.reset();
    }

    
}
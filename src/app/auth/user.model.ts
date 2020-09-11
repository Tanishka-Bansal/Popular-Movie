import { Router } from '@angular/router';

export class User{
    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _token_expiration_date:Date
        ){}
    get token(){
        if(!this._token_expiration_date || new Date()>this._token_expiration_date)
            return ;
        return this._token;
    }    

}
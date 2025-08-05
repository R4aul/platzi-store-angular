import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Auth } from '../models/auth';
import { User } from '../models/user';
import { switchMap, tap } from "rxjs/operators";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth'
  constructor(
    private httpClient : HttpClient,
    private tokenService : TokenService
  ) { }

  login(email: string, password : string){
    return this.httpClient.post<Auth>(this.apiUrl+'/login',{email, password})
    .pipe(
      tap(response=> this.tokenService.saveToken(response.access_token))
    );
  }


  loginAndGet(email : string, password : string){
    return this.login(email,password)
    .pipe(
      switchMap(()=>this.profile())
    );
  }

  profile(){
    return this.httpClient.get<User>(this.apiUrl+'/profile');
  }

}

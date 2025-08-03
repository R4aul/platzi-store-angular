import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth'
  constructor(
    private httpClient : HttpClient
  ) { }

  login(email: string, password : string){
    return this.httpClient.post<Auth>(this.apiUrl+'/login',{email, password});
  }

  profile(){
    return this.httpClient.get(this.apiUrl+'/profile');
  }

}

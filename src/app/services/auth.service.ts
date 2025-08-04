import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Auth } from '../models/auth';
import { User } from '../models/user';

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

  profile(token:string){
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    return this.httpClient.get<User>(this.apiUrl+'/profile',{
      headers:headers
    });
  }

}

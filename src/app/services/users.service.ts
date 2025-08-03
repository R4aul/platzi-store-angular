import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CreateUserDTO } from '../DTO/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/users'
  constructor(
    private httpClient : HttpClient
  ) { }

  create(user : CreateUserDTO){
    return this.httpClient.post(this.apiUrl, user);
  }

  getAll(){
    return this.httpClient.get(this.apiUrl);
  }
}

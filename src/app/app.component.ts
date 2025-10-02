import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgComponent } from "./components/img/img.component";
import { FormsModule } from "@angular/forms";
import { ProductsComponent } from "./components/products/products.component";
import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";
import { FilesService } from "./services/files.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [ FormsModule, ProductsComponent, NavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  imgParent = '';
  token = '';
  imageRta = "";
  constructor(
    private authService : AuthService,
    private userService : UsersService,
    private fileService : FilesService
  ){}

  onLoaded() {
    console.log("log padre");

  }

  creteUser(){
    this.userService.create({
      name:"Raul Damian",
      email:"raul@gamil.com",
      password:"password"
    })
    .subscribe({
      next(response) {
        console.log(response);
      },
    })
  }

  login(){
    this.authService.login('raul@gamil.com', 'password')
    .subscribe({
      next:(response) =>{
        console.log(response.access_token);
        this.token = response.access_token;
      },
    })
  }

  getProfile(){
    this.authService.profile()
    .subscribe({
      next:(response) => {
       console.log(response);
      },
    })
  }

  download(){
    this.fileService.getFile("my.pdf","https://young-sands-07814.herokuapp.com/api/files/dummy.pdf","apllication/pdf").subscribe();
  }

  onUpload(event : Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
    this.fileService.uploadFile(file).subscribe({
      next:(response)=>{
        this.imageRta = response.location; 
      }
    })
    }
  }
}

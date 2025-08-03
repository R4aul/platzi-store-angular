import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgComponent } from "./components/img/img.component";
import { FormsModule } from "@angular/forms";
import { ProductsComponent } from "./components/products/products.component";
import { NavComponent } from "./components/nav/nav.component";
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";

@Component({
  selector: 'app-root',
  imports: [ FormsModule, ProductsComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  imgParent = '';

  constructor(
    private authService : AuthService,
    private userService : UsersService,
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
      next(response) {
        console.log(response.access_token);
      },
    })
  }
}

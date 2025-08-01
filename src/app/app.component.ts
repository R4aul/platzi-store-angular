import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgComponent } from "./components/img/img.component";
import { FormsModule } from "@angular/forms";
import { ProductsComponent } from "./components/products/products.component";
import { NavComponent } from "./components/nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [ FormsModule, ProductsComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  imgParent = '';

  onLoaded() {
    console.log("log padre");

  }
}

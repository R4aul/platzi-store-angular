import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  public activeMenu = false;
  public counter = 0;

  constructor(
    private storeServices : StoreService
  ){}

  ngOnInit(): void {
      this.storeServices.myCart$.subscribe(products=>{
        this.counter = products.length;
      })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }
}

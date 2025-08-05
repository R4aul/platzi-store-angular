import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../services/store.service";
import {AuthService} from "../../services/auth.service";
import { User } from '../../models/user';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  public activeMenu = false;
  public counter = 0;
  public profile : User | null = null;

  constructor(
    private storeServices : StoreService,
    private authSservice : AuthService
  ){}

  ngOnInit(): void {
      this.storeServices.myCart$.subscribe(products=>{
        this.counter = products.length;
      })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authSservice.loginAndGet("raul@gamil.com", 'password')
    .subscribe({
      next:(user)=>{
        this.profile = user
      },
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from "../../models/product";
import { StoreService } from "../../services/store.service";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-products',
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  public myShopingCart : Product[] = [];
  
  public total : number = 0;

  public products: Product[] = [];

  constructor(
    private storeServices : StoreService,
    private productsServices : ProductsService 
  ){
    //se coloca aqui ya que no es asincrono pero por lo general es en el metodo onInit()
    this.myShopingCart = this.storeServices.getMyShopingCart()
  }

  ngOnInit(): void {
    this.productsServices.getAllProducts().subscribe(data=>{
      console.log(data);
      this.products = data;
    });
  }

  /**
   * @param product 
   * 
   * El metodo recibe el product y lo agrega al servives suscrito
   */
  onAddToShopingCart(product : Product){
    console.log(product);
    this.storeServices.addProduct(product);
    this.total = this.storeServices.getTotal(); 
  }
}

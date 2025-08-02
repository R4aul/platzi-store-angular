import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from "../../models/product";
import { StoreService } from "../../services/store.service";
import { ProductsService } from "../../services/products.service";
import {CommonModule} from "@angular/common"
import { CreateProductDTO, UpdateProductDTO } from '../../DTO/productDTO';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsComponent implements OnInit {

  public myShopingCart: Product[] = [];

  public total: number = 0;

  public products: Product[] = [];

  showProductDetail = false;

  productChosen: Product = {
    id: "",
    title: "",
    images: [],
    price: 0,
    category: {
      id: "",
      name: ""
    },
    description: ""
  }

  public limit = 10;
  public offset = 0;

  constructor(
    private storeServices: StoreService,
    private productsServices: ProductsService
  ) {
    //se coloca aqui ya que no es asincrono pero por lo general es en el metodo onInit()
    this.myShopingCart = this.storeServices.getMyShopingCart()
  }

  ngOnInit(): void {
    this.loadMore()
  }

  /**
   * @param product 
   * 
   * El metodo recibe el product y lo agrega al servives suscrito
   */
  onAddToShopingCart(product: Product) {
    console.log(product);
    this.storeServices.addProduct(product);
    this.total = this.storeServices.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsServices.getProduct(id).subscribe({
      next: (Respose) => {
        console.log("PRODUCT",Respose)
        this.toggleProductDetail();
        this.productChosen = Respose;
      },
    });
  }

  creteNewProduct(){
    const product : CreateProductDTO = {
      description:"this is description",
      images:[''],
      price:342,
      title:"this is te title",
      categoryId:2

    };
    this.productsServices.create(product).subscribe({
      next:(Respose)=>{
        this.products.unshift(Respose)
      },
    });
  }

  updateProduct(){
    const change : UpdateProductDTO = {
      title:"Update product jdkas"
    }
    const id = this.productChosen.id;
    this.productsServices.update(id,change).subscribe({
      next:(data)=> {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
        //this.products[productIndex] = data;
      },
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsServices.delete(id).subscribe({
      next:()=>{
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
        this.products.splice(productIndex,1);
        this.showProductDetail = false;
      }
    })
  }

  loadMore(){
    this.productsServices.getProductsByPage(this.limit, this.offset).subscribe(data => {
      console.log(data);
      this.products = this.products.concat(data);
      this.offset += this.limit
    });
  }

}

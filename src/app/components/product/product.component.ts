import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../models/product";
import {CommonModule} from "@angular/common"

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product : Product = {
    id :"",
    title: "",
    images: [],
    price: 0,
    category:{
      id:"",
      name:""
    },
    description:""
  }

  /**
   * Se importa Output y EventEmitter<Product>
   */
  @Output() addedProduct = new EventEmitter<Product>(); 
  @Output() showProduct = new EventEmitter<string>(); 

  /**
   * este metodo emite el evento addedProduct con el producto de salida
   */
  onAddToCard(){
    this.addedProduct.emit(this.product);
  }

  showDetail(){
    this.showProduct.emit(this.product.id);
  }
}

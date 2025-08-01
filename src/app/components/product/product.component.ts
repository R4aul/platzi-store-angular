import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../models/product";

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product : Product = {
    id :"",
    title: "",
    image: "",
    price: 0,
    category:"",
    description:""
  }

  /**
   * Se importa Output y EventEmitter<Product>
   */
  @Output() addedProduct = new EventEmitter<Product>(); 

  /**
   * este metodo emite el evento addedProduct con el producto de salida
   */
  onAddToCard(){
    this.addedProduct.emit(this.product);
  }
}

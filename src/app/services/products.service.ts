import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from '../models/product';
import { CreateProductDTO, UpdateProductDTO } from '../DTO/productDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllProducts(){
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getProduct(id : string){
    return this.httpClient.get<Product>(this.apiUrl+'/'+id);
  }

  create(data : CreateProductDTO){
    return this.httpClient.post<Product>(this.apiUrl,data)
  }

  update(id:string, data:UpdateProductDTO){
    return this.httpClient.patch(this.apiUrl+'/'+id,data)
  }

  delete(id:string){
    return this.httpClient.delete<boolean>(this.apiUrl+'/'+id);
  }
}

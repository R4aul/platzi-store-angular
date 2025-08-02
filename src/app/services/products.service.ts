import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
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

  getAllProducts(limit?:number, offset?:number){
    let params = new HttpParams()
    if (limit && offset) {
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.httpClient.get<Product[]>(this.apiUrl, {params});
  }

  getProductsByPage(limit:number, offset:number){
    return this.httpClient.get<Product[]>(this.apiUrl,{
      params:{limit,offset}
    });
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

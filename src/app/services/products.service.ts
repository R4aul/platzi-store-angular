import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Product } from '../models/product';
import { CreateProductDTO, UpdateProductDTO } from '../DTO/productDTO';
import { catchError} from "rxjs/operators";
import { throwError } from "rxjs";

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
    return this.httpClient.get<Product>(this.apiUrl+'/'+id)
    .pipe(
      catchError((error : HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError("Algo esta fallando el el server")
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError("El producto no existe")
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError("El producto no existe")
        }
        return throwError("Ups algo salio mal")
      })
    );
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

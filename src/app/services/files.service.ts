import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";
import { tap, map } from 'rxjs';

interface File{
  originalname : string,
  filename:string,
  location:string
}


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/files';

  constructor(
    private httpClient : HttpClient
  ) { }

  public getFile(name : string, url : string , type : string){
    return this.httpClient.get(url,{responseType:'blob'})
    .pipe(
      tap(content=>{
        const blob = new Blob([content], {type});
        saveAs(blob, name)
      }),
      map(()=> true)
    );
  }

  uploadFile(file : Blob){
    const dto = new FormData();
    dto.append("file", file)
    return this.httpClient.post<File>(this.apiUrl+"/upload", dto,{
      //revisar si el backend lo necesita si no no es necesario
      //headers:{
      //  "Content-type":"multipart/form-data"
      //}
    });
  }

}

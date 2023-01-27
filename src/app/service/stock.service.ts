import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from '../layout/model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  host = environment.apiUrl;

  private _refreshrequired= new Subject<void>();
  constructor(private http:HttpClient) { }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  postStock(data:any):Observable<Stock | HttpErrorResponse>{
    
    return this.http.post<Stock>(this.host+'/stock/add-stock',data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

 

  putStock(data:any,stockId:string,):Observable<Stock | HttpErrorResponse>{

    return this.http.put<any>(this.host+'/stock/update-stock/'+stockId,data)
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deleteStock(id:number){

    return this.http.delete<any>(this.host+'/stock/delete-stock/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }



  getAllStock(){

    return this.http.get<any>(this.host+'/stock/list-stock');
  }

}

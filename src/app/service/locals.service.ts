import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { locals } from '../layout/model/locals';

@Injectable({
  providedIn: 'root'
})
export class LocalsService {

  host = environment.apiUrl;

  private _refreshrequired= new Subject<void>();

  constructor(private http:HttpClient) { }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  postlocal(data:any):Observable<locals | HttpErrorResponse>{
    
    return this.http.post<locals>(this.host+'/locales/add-locales',data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  putlocal(data:any,locaId:string):Observable<locals | HttpErrorResponse>{

    return this.http.put<locals>(this.host+'/locales/update-local/'+locaId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deletelocal(id:number){

    return this.http.delete<any>(this.host+'/locales/delete-local/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }



  getAlllocal(){

    return this.http.get<any>(this.host+'/locales/locale-list');
  }
}

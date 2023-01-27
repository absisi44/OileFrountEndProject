import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transit } from '../layout/model/transit';

@Injectable({
  providedIn: 'root'
})
export class TransitsService {

  host = environment.apiUrl;
  private _refreshrequired= new Subject<void>();

  constructor(private http:HttpClient) { }

  get RequiredRefresh(){
    return this._refreshrequired;
  }
 
  postTransit(data:any):Observable<Transit | HttpErrorResponse>{
    
    return this.http.post<Transit>(this.host+'/transit/add-transit',data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }


  getAlTransit(){

    return this.http.get<any>(this.host+'/transit/lis-transit');
  }


  putTransit(data:any,transitId:string):Observable<Transit | HttpErrorResponse>{

    return this.http.put<Transit>(this.host+'/transit/update-transit/'+transitId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }


  deleteTransit(id:number){

    return this.http.delete<any>(this.host+'/transit/delete-transit/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }



}

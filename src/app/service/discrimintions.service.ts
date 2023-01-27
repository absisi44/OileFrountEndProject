import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { discriminations } from '../layout/model/discriminations';

@Injectable({
  providedIn: 'root'
})
export class DiscrimintionsService {

  host = environment.apiUrl;

  private _refreshrequired= new Subject<void>();


  constructor(private http:HttpClient) { }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  postdicrimi(data:any):Observable<discriminations | HttpErrorResponse>{
    
    return this.http.post<discriminations>(this.host+'/discrim/add-discr',data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  putdicrimi(data:any,dicrId:string):Observable<discriminations | HttpErrorResponse>{

    return this.http.put<discriminations>(this.host+'/discrim/update-discr/'+dicrId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }


  deletedicrimi(id:number){

    return this.http.delete<any>(this.host+'/discrim/delete-discr/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  getAlldicrimi(){

    return this.http.get<any>(this.host+'/discrim/discr-list')
  }
}

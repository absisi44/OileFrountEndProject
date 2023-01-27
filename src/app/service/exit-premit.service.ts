import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { exitPermit } from '../layout/model/exitPermit';

@Injectable({
  providedIn: 'root'
})
export class ExitPremitService {

  host = environment.apiUrl;
  private _refreshrequired= new Subject<void>();
  
  constructor(private http:HttpClient) { }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  postExitPermit(data:any,incomeId:string):Observable<exitPermit | HttpErrorResponse>{
   
    return this.http.post<exitPermit>(this.host+'/exitpermit/add-exitpermit/'+incomeId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }


  putExitPermit(data:any,exitpermitId:string):Observable<exitPermit | HttpErrorResponse>{

    return this.http.put<exitPermit>(this.host+'/exitpermit/update-exitpermit/'+exitpermitId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }



  deleteExitPermit(id:number){

    return this.http.delete<any>(this.host+'/exitpermit/delete-exitpermit/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }


  getAllExitPermit(){

    return this.http.get<any>(this.host+'/exitpermit/lis-exitpermit');
  }

  
}

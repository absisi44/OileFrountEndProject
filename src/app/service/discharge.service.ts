import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespons } from '../layout/model/custom-http-response';
import { Discharge } from '../layout/model/discharge';

@Injectable({
  providedIn: 'root'
})
export class DischargeService {

  host = environment.apiUrl;
  private _refreshrequired= new Subject<void>();
  constructor(private http:HttpClient) { }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  postdischarge(data:any,incomeId:string) : Observable<Discharge | HttpErrorResponse>{
    
    return this.http.post<Discharge>(this.host+'/discharge/add-discharge/'+incomeId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
    
  }

  putdischarge(data:any,dischargeId:string): Observable<Discharge | HttpErrorResponse>{

    return this.http.put<any>(this.host+'/discharge/update-discharge/'+dischargeId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deleteDischarge(id:number): Observable<CustomHttpRespons | HttpErrorResponse>{

    return this.http.delete<any>(this.host+'/discharge/delete-discharge/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  getAllDischarge(){

    return this.http.get<any>(this.host+'/discharge/lis-discharge')
  }
}

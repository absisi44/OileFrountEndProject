import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Income } from '../layout/model/incomFuel';

@Injectable({
  providedIn: 'root'
})
export class IcomeService {

  //incomeToE: any;
  host = environment.apiUrl;
  private _refreshrequired= new Subject<void>();

  constructor(private http:HttpClient ) { }

  get RequiredRefresh(){
    return this._refreshrequired;
  }
  postIncom(data:any):Observable<Income | HttpErrorResponse>{
    
    return this.http.post<Income>(this.host+'/income/add-income',data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  getAllIncom(){

    return this.http.get<any>(this.host+'/income/lis-income');
  }

  getAllIncomByStatus(){

    return this.http.get<any>(this.host+'/income/lis-incommensurate');
  }


  putIncome(data:any,incomeId:string):Observable<Income | HttpErrorResponse>{

    return this.http.put<Income>(this.host+'/income/update-income/'+incomeId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deleteIncome(id:number){

    return this.http.delete<any>(this.host+'/income/delete-income/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }


}

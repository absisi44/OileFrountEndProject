import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FuelTicketDept } from '../layout/model/fuelTicketDept';

@Injectable({
  providedIn: 'root'
})
export class FuelTicketDeptService {

  host = environment.apiUrl;
  private _refreshrequired= new Subject<void>();
  

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private http:HttpClient) { }

  postFuelTicketDept(data:any):Observable<FuelTicketDept | HttpErrorResponse>{
   
    return this.http.post<FuelTicketDept>(this.host+'/FuelTicketD/add-fuelTicket/',data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  putFuelTicketDept(data:any,fueltiketfId:string):Observable<FuelTicketDept | HttpErrorResponse>{

    return this.http.put<any>(this.host+'/FuelTicketD/update-Ticketstatus/'+data,fueltiketfId)
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  putFuelTicketDeptStatus(data:any,fueltiketfId:string,):Observable<FuelTicketDept | HttpErrorResponse>{

    return this.http.put<any>(this.host+'/FuelTicketD/update-fuelTicket/'+fueltiketfId,data)
    .pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deleteFuelTicketDept(id:number){

    return this.http.delete<any>(this.host+'/FuelTicketD/delete-fuelTicket/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }
  getAllFuelTicketDept(){

    return this.http.get<any>(this.host+'/FuelTicketD/lis-fuelTicket');
  }


}

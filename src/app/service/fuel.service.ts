import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { fuel } from '../layout/model/fuel';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  host = environment.apiUrl;

  private _refreshrequired= new Subject<void>();

  constructor(private http:HttpClient) { }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  postfuel(data:any): Observable<fuel | HttpErrorResponse>{
    
    return this.http.post<fuel>(this.host+'/fuel/add-fuel',data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }


  putfuel(data:any,fuelId:string):Observable<fuel | HttpErrorResponse>{

    return this.http.put<fuel>(this.host+'/fuel/update-fuelId/'+fuelId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deletefuel(id:number){

    return this.http.delete<any>(this.host+'/fuel/delete-fuel/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }


  getAllfuel(){

    return this.http.get<any>(this.host+'/fuel/lis-fuels')
  }


}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../layout/model/companies';
import { CustomHttpRespons } from '../layout/model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  host = environment.apiUrl;
  private _refreshrequired= new Subject<void>();
  constructor(private http:HttpClient) { }

  get RequiredRefresh(){
    return this._refreshrequired;
  }

  postcompany(data:any) : Observable<Company | HttpErrorResponse>{
    
    return this.http.post<Company>(this.host+'/company/addcompany',data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
    
  }

  putcompany(data:any,companyId:string): Observable<Company | HttpErrorResponse>{

    return this.http.put<any>(this.host+'/company/updateCompany/'+companyId,data).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  deletecompany(id:number): Observable<CustomHttpRespons | HttpErrorResponse>{

    return this.http.delete<any>(this.host+'/company/deleteCompany/'+id).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

  getAllcompany(){

    return this.http.get<any>(this.host+'/company/listCompany')
  }
}

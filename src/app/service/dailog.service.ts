import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfromDailoComponent } from '../layout/mat-confrom-dailo/mat-confrom-dailo.component';

@Injectable({
  providedIn: 'root'
})
export class DailogService {

  constructor(private dailog:MatDialog) { }

  openConfirmDialog(msg:any){
    return  this.dailog.open(MatConfromDailoComponent,{
        width:'450px',
        panelClass:'confirm-dailog-container',
        position:{top:'10px'},
        disableClose:true,
        data:{
          message: msg
        }
      })
    }
}

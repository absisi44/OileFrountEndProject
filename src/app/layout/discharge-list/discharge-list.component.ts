import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogService } from 'src/app/service/dailog.service';
import { DischargeService } from 'src/app/service/discharge.service';
import { NotificationService } from 'src/app/service/notification.service';
import { DischargeFormComponent } from '../discharge-form/discharge-form.component';
import { NotificationType } from '../enum/notification-type.enum';
import { ListInfstockComponent } from '../list-infstock/list-infstock.component';
import { Discharge } from '../model/discharge';

@Component({
  selector: 'app-discharge-list',
  templateUrl: './discharge-list.component.html',
  styleUrls: ['./discharge-list.component.css']
})
export class DischargeListComponent implements OnInit {

  ELEMET_DATA!:Discharge[];

  displayedColumns: string[] = ['dischargeId','dischargeDate','comManName',
            'income','empName','Action'];

  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  dataSource = new MatTableDataSource<Discharge>(this.ELEMET_DATA);

  constructor( private dischargeServic:DischargeService,
     private dailogService:DailogService,
    private dailog:MatDialog ,
     private notificati:NotificationService) { }

  ngOnInit(): void {
    this.getADischarge();
    this.dischargeServic.RequiredRefresh.subscribe(r =>{
      this.getADischarge();
    });
  }

  getADischarge(){
    
    this.dischargeServic.getAllDischarge().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
      }
    })
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dailog.open(ListInfstockComponent,dialogConfig);
  }

  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="35%";
    dialogConfig.data=row;
 this.dailog.open(DischargeFormComponent,dialogConfig);

}

OnDelete(id:number){

  this.dailogService.openConfirmDialog("Are You Sure To Delete This Record ?")
  .afterClosed().subscribe(res=>{
    if(res){
      this.dischargeServic.deleteDischarge(id).subscribe({
        next:(res)=>{
         
          this.notificati.notify(NotificationType.SUCCESS,"Company Deleted Successfully");
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
     
        }
      }); 
    }
  });
}

Onsearch(){
  this.SearrchKey="";
  this.applyFilter();
  this.ngAfterViewInit();
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter() {
  
  this.dataSource.filter = this.SearrchKey.trim().toLowerCase();
}

private sendNotification( notification: NotificationType, message: string):void {
  if (message) {
    this.notificati.notify(notification, message);
  } else {
    this.notificati.notify(
      notification,
      'An error occured. Please Try Again '
    );
  }
}

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogService } from 'src/app/service/dailog.service';
import { ExitPremitService } from 'src/app/service/exit-premit.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { ExitPrintComponent } from '../exit-print/exit-print.component';
import { ExitpermitFormComponent } from '../exitpermit-form/exitpermit-form.component';
import { LisIncomeComponent } from '../lis-income/lis-income.component';
import { exitPermit } from '../model/exitPermit';

@Component({
  selector: 'app-exitpermit-list',
  templateUrl: './exitpermit-list.component.html',
  styleUrls: ['./exitpermit-list.component.css']
})
export class ExitpermitListComponent implements OnInit {

  ELEMET_DATA!:exitPermit[];
  displayedColumns: string[] = ['exitpermitId','permitdate','income','fees',
  'income-trouckNO','income-quantity',
   'reciptNo','checkBankNo','empName','Action'];
  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;                              
  dataSource = new MatTableDataSource <exitPermit>(this.ELEMET_DATA);

  constructor(private exitpermitSrvic:ExitPremitService, 
    private dailogService:DailogService,
    private dailog:MatDialog , 
    private notification:NotificationService) { }

  ngOnInit(): void {

    this.getAllLocal();
    this.exitpermitSrvic.RequiredRefresh.subscribe(r =>{
      this.getAllLocal();
    });
  }


  getAllLocal(){
    
    this.exitpermitSrvic.getAllExitPermit().subscribe({
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
    this.dailog.open(LisIncomeComponent,dialogConfig);
  }

  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="45%";
    dialogConfig.data=row;
    this.dailog.open(ExitpermitFormComponent,dialogConfig);

}

onPrint(row: any){
    
  const dialogConfig=new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="16%";
  dialogConfig.data=row;
  this.dailog.open(ExitPrintComponent,dialogConfig);

}

OnDelete(id:number){

  this.dailogService.openConfirmDialog("Are You Sure To Delete This Record ?")
  .afterClosed().subscribe(res=>{
    if(res){
      this.exitpermitSrvic.deleteExitPermit(id).subscribe({
        next:(res)=>{
          this.sendNotification(NotificationType.SUCCESS,'Exit Permit Deleted Successfully')
         
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
    this.notification.notify(notification, message);
  } else {
    this.notification.notify(
      notification,
      'An error occured. Please Try Again '
    );
  }
}


}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogService } from 'src/app/service/dailog.service';
import { FuelTicketDeptService } from 'src/app/service/fuel-ticket-dept.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { FuelTicketDept } from '../model/fuelTicketDept';
import { TicketFdpFormComponent } from '../ticket-fdp-form/ticket-fdp-form.component';

@Component({
  selector: 'app-ticket-fdp-list',
  templateUrl: './ticket-fdp-list.component.html',
  styleUrls: ['./ticket-fdp-list.component.css']
})
export class TicketFdpListComponent implements OnInit {

  ELEMET_DATA!:FuelTicketDept[];
  displayedColumns: string[] = ['id','fueltiketfId', 'fueltiketfDate', 'quantity',
   'direcation','benficiary','fuel','companies','discriminations', 'status','Action'];

   dataSource = new MatTableDataSource<FuelTicketDept>(this.ELEMET_DATA);
   SearrchKey!:string;
   @ViewChild(MatPaginator)
   paginator!: MatPaginator;
   @ViewChild(MatSort)
   sort!: MatSort;

  constructor(private fuelTicketDeptService:FuelTicketDeptService,private dailog:MatDialog,
    private dailogService:DailogService, 
    private notificati:NotificationService) { }

  ngOnInit(): void {

    this.getAllFuelTicketDept();
    this.fuelTicketDeptService.RequiredRefresh.subscribe(r =>{
      this.getAllFuelTicketDept();
    });
  }


  Onsearch(){
    this.SearrchKey="";
    this.applyFilter();
    this.ngAfterViewInit();
  }


  getAllFuelTicketDept(){
    
    this.fuelTicketDeptService.getAllFuelTicketDept().subscribe({
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
 this.dailog.open(TicketFdpFormComponent,dialogConfig);
  }

  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.data=row;
    console.log(row)
 this.dailog.open(TicketFdpFormComponent,dialogConfig);

}



OnDelete(id:number){

  this.dailogService.openConfirmDialog("هل تريد مسح هذا السجل ?")
  .afterClosed().subscribe(res=>{
    if(res){
      this.fuelTicketDeptService.deleteFuelTicketDept(id).subscribe({
        next:(res)=>{
          this.sendNotification(NotificationType.SUCCESS,'تم مسح اذن الصرف بنجاح');
          
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
        }
      }); 
    }
  });
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
        'حدث خطاء. الرجاء المحاولة مرة اخرى '
      );
    }
	}

}

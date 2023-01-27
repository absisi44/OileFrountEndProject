import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogService } from 'src/app/service/dailog.service';
import { IcomeService } from 'src/app/service/icome.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { ExitpermitFormComponent } from '../exitpermit-form/exitpermit-form.component';
import { IncomeFormComponent } from '../income-form/income-form.component';
import { Income } from '../model/incomFuel';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  ELEMET_DATA!:Income[];
  displayedColumns: string[] = ['id','incomeId', 'incomeDate', 'truckNo',
   'fuel','quantity','discriminations','companies','locales',
    'invoiceNo','shippingDate','status','Action'];

  dataSource = new MatTableDataSource<Income>(this.ELEMET_DATA);
  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private incomServic:IcomeService,private dailog:MatDialog,
    private dailogService:DailogService, 
    private notificati:NotificationService
  ) { }

  ngOnInit(): void {

    this.getAllincom();
    this.incomServic.RequiredRefresh.subscribe(r =>{
      this.getAllincom();
    });


  }


  getAllincom(){
    
    this.incomServic.getAllIncom().subscribe({
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 

  Onsearch(){
    this.SearrchKey="";
    this.applyFilter();
    this.ngAfterViewInit();
  }

 
  applyFilter() {
    
    this.dataSource.filter = this.SearrchKey.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
 this.dailog.open(IncomeFormComponent,dialogConfig);
  }

  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.data=row;
    console.log(row)
 this.dailog.open(IncomeFormComponent,dialogConfig);

}

onEixtPermit(row:any){
    
  const dialogConfig=new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="60%";
  dialogConfig.data=row;
this.dailog.open(ExitpermitFormComponent,dialogConfig);
}

OnDelete(id:number){

  this.dailogService.openConfirmDialog("Are You Sure To Delete This Record ?")
  .afterClosed().subscribe(res=>{
    if(res){
      this.incomServic.deleteIncome(id).subscribe({
        next:(res)=>{
          this.sendNotification(NotificationType.SUCCESS,'Income Fuel Deleted Successfully');
          
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
        }
      }); 
    }
  });
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

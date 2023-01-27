import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogService } from 'src/app/service/dailog.service';
import { NotificationService } from 'src/app/service/notification.service';
import { StockService } from 'src/app/service/stock.service';
import { NotificationType } from '../enum/notification-type.enum';
import { Stock } from '../model/stock';
import { StockFormComponent } from '../stock-form/stock-form.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  ELEMET_DATA:Stock[]=[];
  displayedColumns: string[] = ['stockId','company','fuel','discriminations','quantity','Action'];
  dataSource = new MatTableDataSource<Stock>(this.ELEMET_DATA);

  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private stockService:StockService,
    private dailog:MatDialog,
    private dailogService:DailogService, 
    private notificati:NotificationService) { }

  ngOnInit(): void {

    this.getATransits();
    this.stockService.RequiredRefresh.subscribe(
      res=>{
        this.getATransits(); 
      }
    )
  }


  getATransits(){
    
    this.stockService.getAllStock().subscribe({
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
    dialogConfig.width="50%";
    this.dailog.open(StockFormComponent,dialogConfig);
  }

  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.data=row;
    this.dailog.open(StockFormComponent,dialogConfig);

}

OnDelete(id:number){

  this.dailogService.openConfirmDialog("Are You Sure To Delete This Record ?")
  .afterClosed().subscribe(res=>{
    if(res){
      this.stockService.deleteStock(id).subscribe({
        next:(res)=>{
          this.sendNotification(NotificationType.ERROR,'Stock Deleted Successfully');
          
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

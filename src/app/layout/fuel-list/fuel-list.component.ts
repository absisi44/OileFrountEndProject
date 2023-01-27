import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogService } from 'src/app/service/dailog.service';
import { FuelService } from 'src/app/service/fuel.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { FuelFormComponent } from '../fuel-form/fuel-form.component';
import { fuel } from '../model/fuel';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.component.html',
  styleUrls: ['./fuel-list.component.css']
})
export class FuelListComponent implements OnInit {

  ELEMET_DATA!:fuel[];

  displayedColumns: string[] = ['fuelId','fuelName','Action'];

  dataSource = new MatTableDataSource<fuel>(this.ELEMET_DATA);

  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private fuleServic:FuelService, private dailogService:DailogService,
    private dailog:MatDialog , private notificati:NotificationService) { }

  ngOnInit(): void {

    this.getAFuel();
    this.fuleServic.RequiredRefresh.subscribe(r =>{
      this.getAFuel();
    });

  }

  getAFuel(){
    
    this.fuleServic.getAllfuel().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(errorResponse: HttpErrorResponse)=>{
        this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
      }
    })
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="30%";
    this.dailog.open(FuelFormComponent,dialogConfig);
  }

  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.data=row;
 this.dailog.open(FuelFormComponent,dialogConfig);

}


OnDelete(id:number){

  this.dailogService.openConfirmDialog("Are You Sure To Delete This Record ?")
  .afterClosed().subscribe(res=>{
    if(res){
      this.fuleServic.deletefuel(id).subscribe({
        next:(res)=>{
          this.sendNotification(NotificationType.SUCCESS,"Fuel Deleted Successfully");
         
        },
        error:(errorResponse: HttpErrorResponse)=>{
          this.sendNotification(NotificationType.ERROR,errorResponse.error);
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

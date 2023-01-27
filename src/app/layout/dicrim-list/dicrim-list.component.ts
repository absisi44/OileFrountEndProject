import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogService } from 'src/app/service/dailog.service';
import { DiscrimintionsService } from 'src/app/service/discrimintions.service';
import { NotificationService } from 'src/app/service/notification.service';
import { DicrimFormComponent } from '../dicrim-form/dicrim-form.component';
import { NotificationType } from '../enum/notification-type.enum';
import { discriminations } from '../model/discriminations';

@Component({
  selector: 'app-dicrim-list',
  templateUrl: './dicrim-list.component.html',
  styleUrls: ['./dicrim-list.component.css']
})
export class DicrimListComponent implements OnInit {

  ELEMET_DATA!:discriminations[];

  displayedColumns: string[] = ['dicrId','discrName','Action'];

  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource = new MatTableDataSource <discriminations>(this.ELEMET_DATA);
  constructor(private discrimService:DiscrimintionsService,
     private dailogService:DailogService,
    private dailog:MatDialog ,
     private notificati:NotificationService) { }

  ngOnInit(): void {

    this.getAllLocal();
    this.discrimService.RequiredRefresh.subscribe(r =>{
      this.getAllLocal();
    });
  }


  getAllLocal(){
    
    this.discrimService.getAlldicrimi().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("Errore while featching data");
      }
    })
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="30%";
    this.dailog.open(DicrimFormComponent,dialogConfig);
  }

  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="30%";
    dialogConfig.data=row;
    this.dailog.open(DicrimFormComponent,dialogConfig);

}

OnDelete(id:number){

  this.dailogService.openConfirmDialog("Are You Sure To Delete This Record ?")
  .afterClosed().subscribe(res=>{
    if(res){
      this.discrimService.deletedicrimi(id).subscribe({
        next:(res)=>{
          this.sendNotification(NotificationType.SUCCESS,'Discrimantion Deleted Successfully')
          
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
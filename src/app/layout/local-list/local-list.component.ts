import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogService } from 'src/app/service/dailog.service';
import { LocalsService } from 'src/app/service/locals.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { LocalFormComponent } from '../local-form/local-form.component';
import { locals } from '../model/locals';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css']
})
export class LocalListComponent implements OnInit {

  
  ELEMET_DATA!:locals[];

  displayedColumns: string[] = ['locaId','locaName','Action'];

  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  dataSource = new MatTableDataSource <locals>(this.ELEMET_DATA);

  constructor(private localServic:LocalsService, private dailogService:DailogService,
    private dailog:MatDialog , private notificati:NotificationService) { }

  ngOnInit(): void {

    this.getAllLocal();
    this.localServic.RequiredRefresh.subscribe(r =>{
      this.getAllLocal();
    });
  }

  getAllLocal(){
    
    this.localServic.getAlllocal().subscribe({
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
    this.dailog.open(LocalFormComponent,dialogConfig);
  }

  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="30%";
    dialogConfig.data=row;
    this.dailog.open(LocalFormComponent,dialogConfig);

}

OnDelete(id:number){

  this.dailogService.openConfirmDialog("Are You Sure To Delete This Record ?")
  .afterClosed().subscribe(res=>{
    if(res){
      this.localServic.deletelocal(id).subscribe({
        next:(res)=>{
          
          this.sendNotification(NotificationType.SUCCESS,'Local Deleted Successfully');
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
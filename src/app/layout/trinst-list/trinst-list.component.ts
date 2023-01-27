import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogService } from 'src/app/service/dailog.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TransitsService } from 'src/app/service/transits.service';
import { NotificationType } from '../enum/notification-type.enum';
import { Transit } from '../model/transit';
import { TrinstFormComponent } from '../trinst-form/trinst-form.component';

@Component({
  selector: 'app-trinst-list',
  templateUrl: './trinst-list.component.html',
  styleUrls: ['./trinst-list.component.css']
})
export class TrinstListComponent implements OnInit {

  ELEMET_DATA!:Transit[];
  displayedColumns: string[] = ['transitId','incomeDate','truckNo','fuel','quantity'
  ,'companies','shepmetDirection','agentName','Action'];

  dataSource = new MatTableDataSource<Transit>(this.ELEMET_DATA);

  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  
  constructor(private transitSrevice:TransitsService,
    private dailog:MatDialog,
    private dailogService:DailogService,
     private notificati:NotificationService) { }

  ngOnInit(): void {

    this.getATransits();
    this.transitSrevice.RequiredRefresh.subscribe(r =>{
      this.getATransits();
    });
  }


  getATransits(){
    
    this.transitSrevice.getAlTransit().subscribe({
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
 this.dailog.open(TrinstFormComponent,dialogConfig);
  }


  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.data=row;
 this.dailog.open(TrinstFormComponent,dialogConfig);

}

  OnDelete(id:number){

    this.dailogService.openConfirmDialog("Are You Sure To Delete This Record ?")
    .afterClosed().subscribe(res=>{
      if(res){
        this.transitSrevice.deleteTransit(id).subscribe({
          next:(res)=>{
            this.sendNotification(NotificationType.SUCCESS,'Transit Deleted Successfully');
            
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

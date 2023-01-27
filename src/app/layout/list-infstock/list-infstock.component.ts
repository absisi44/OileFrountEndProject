import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IcomeService } from 'src/app/service/icome.service';
import { NotificationService } from 'src/app/service/notification.service';
import { DisfoemsaveComponent } from '../disfoemsave/disfoemsave.component';
import { NotificationType } from '../enum/notification-type.enum';
import { Income } from '../model/incomFuel';

@Component({
  selector: 'app-list-infstock',
  templateUrl: './list-infstock.component.html',
  styleUrls: ['./list-infstock.component.css']
})
export class ListInfstockComponent implements OnInit {

  ELEMET_DATA!:Income[];
  displayedColumns: string[] = ['incomeId',  'truckNo',
   'fuel','discriminations','companies','locales','status','Action'];

  dataSource = new MatTableDataSource<Income>(this.ELEMET_DATA);
  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor( private incomServic:IcomeService,private dailog:MatDialog,
    
    private notificati:NotificationService,
    public dialogRef: MatDialogRef<DisfoemsaveComponent>) { }

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


  onEixtPermit(row:any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.data=row;
  this.dailog.open(DisfoemsaveComponent,dialogConfig);
  this.onClose();
  }
  onClose() {
    //this.incomForm.reset();
    this.dialogRef.close();
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

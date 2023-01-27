import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompaniesService } from 'src/app/service/companies.service';
import { DailogService } from 'src/app/service/dailog.service';
import { NotificationService } from 'src/app/service/notification.service';
import { CmpanyFromComponent } from '../cmpany-from/cmpany-from.component';
import { NotificationType } from '../enum/notification-type.enum';
import { Company } from '../model/companies';

@Component({
  selector: 'app-cmpany-list',
  templateUrl: './cmpany-list.component.html',
  styleUrls: ['./cmpany-list.component.css']
})
export class CmpanyListComponent implements OnInit {

  ELEMET_DATA!:Company[];

  displayedColumns: string[] = ['companyId','companyName','Action'];

  SearrchKey!:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  dataSource = new MatTableDataSource<Company>(this.ELEMET_DATA);

  constructor(private companyServic:CompaniesService, private dailogService:DailogService,
    private dailog:MatDialog , private notificati:NotificationService) { }

  ngOnInit(): void {

    this.getACopmanies();
    this.companyServic.RequiredRefresh.subscribe(r =>{
      this.getACopmanies();
    });
  }

  getACopmanies(){
    
    this.companyServic.getAllcompany().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        this.notificati.notify(NotificationType.ERROR,"Errore while featching data");
      }
    })
  }

  onCreate(){
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="35%";
    this.dailog.open(CmpanyFromComponent,dialogConfig);
  }

  onEdit(row: any){
    
    const dialogConfig=new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="35%";
    dialogConfig.data=row;
 this.dailog.open(CmpanyFromComponent,dialogConfig);

}

OnDelete(cmpID:number){

  this.dailogService.openConfirmDialog("Are You Sure To Delete This Record ?")
  .afterClosed().subscribe(res=>{
    if(res){
      this.companyServic.deletecompany(cmpID).subscribe({
        next:(res)=>{
         
          this.notificati.notify(NotificationType.SUCCESS,"Company Deleted Successfully");
        },
        error:(res)=>{
        
          this.notificati.notify(NotificationType.ERROR,"Error While Deleting Record!")
          
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

}

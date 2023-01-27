import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { CompaniesService } from 'src/app/service/companies.service';
import { DiscrimintionsService } from 'src/app/service/discrimintions.service';
import { FuelService } from 'src/app/service/fuel.service';
import { NotificationService } from 'src/app/service/notification.service';
import { StockService } from 'src/app/service/stock.service';
import { NotificationType } from '../enum/notification-type.enum';
import { Company } from '../model/companies';
import { discriminations } from '../model/discriminations';
import { fuel } from '../model/fuel';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  fuelDate: fuel[] = [];
  companyDate: Company[] = [];
  discrimitionDate: discriminations[] = [];
 
  
  //crate from Group
  stockForm = new FormGroup({
    companies: new FormControl('', Validators.required),
    fuel: new FormControl('', Validators.required),
    discriminations: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
  })

  constructor(public dialogRef: MatDialogRef<StockFormComponent>,
    private stockService: StockService,
    private notificatin: NotificationService,
    private fuleservice: FuelService,
    private companys: CompaniesService,
    private discrimations: DiscrimintionsService,
    @Inject(MAT_DIALOG_DATA) public editeData: any) { }

  ngOnInit(): void {


     //set Data Into From

     if (this.editeData) {
      this.actionTitel = 'Modify Record';
      this.actionBtn = 'Update';
      this.stockForm.controls['companies'].setValue(this.editeData.companies);
      this.stockForm.controls['fuel'].setValue(this.editeData.fuel);
      this.stockForm.controls['discriminations'].setValue(this.editeData.discriminations);
      this.stockForm.controls['quantity'].setValue(this.editeData.quantity);
    
    }

     //call company,fuel,dicri,local data
     this.getfuels();
     this.getAllCompanies();
     this.getAlldiscimi();

   

  }


  //save Transit
  onCreate() {
    if (!this.editeData) {
      if (this.stockForm.valid) {
        this.stockService.postStock(this.stockForm.value).subscribe({
          next: (_res) => {
            this.sendNotification(NotificationType.SUCCESS,'Transit Saved Successfuly');
            this.dialogRef.close();
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
            this.dialogRef.close();
          },
        });
      }
    } else {
      this.onUdateTransit();
    }
  }

  //update transit 
  onUdateTransit() {
    this.stockService
      .putStock(this.stockForm.value, this.editeData.stockId)
      .subscribe({
        next: (_res) => {
          this.sendNotification(NotificationType.SUCCESS,'Transit Update  Successfuly');
        
          //this.incomForm.reset();
          this.dialogRef.close();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
        },
      });
  }

  onClose() {
    //this.incomForm.reset();
    this.dialogRef.close();
  }

  onClear() {
    this.stockForm.reset();
    //this.initializeFormincom();
  }


   //Method to get all fuels
   getfuels() {
    this.fuleservice.getAllfuel().subscribe({
      next: (res) => {
        this.fuelDate = res;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
      },
    });
  }

  //Method to get all copmanies
  getAllCompanies() {
    this.companys.getAllcompany().subscribe({
      next: (res) => {
        this.companyDate = res;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
      },
    });
  }

  //Method to get all discrimation
  getAlldiscimi() {
    this.discrimations.getAlldicrimi().subscribe({
      next: (res) => {
        this.discrimitionDate = res;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
      },
    });
  }

  private sendNotification( notification: NotificationType, message: string):void {
    if (message) {
      this.notificatin.notify(notification, message);
    } else {
      this.notificatin.notify(
        notification,
        'An error occured. Please Try Again '
      );
    }
  }

}

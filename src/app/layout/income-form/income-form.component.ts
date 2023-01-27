import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { CompaniesService } from 'src/app/service/companies.service';
import { DiscrimintionsService } from 'src/app/service/discrimintions.service';
import { FuelService } from 'src/app/service/fuel.service';
import { IcomeService } from 'src/app/service/icome.service';
import { LocalsService } from 'src/app/service/locals.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { Company } from '../model/companies';
import { discriminations } from '../model/discriminations';
import { fuel } from '../model/fuel';
import { locals } from '../model/locals';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  fuelDate: fuel[] = [];
  companyDate: Company[] = [];
  discrimitionDate: discriminations[] = [];
  localsData: locals[] = [];

  localinfo: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  id: any;
  selectedValue: string | undefined;
  compareFn(option1: any, option2: any) {
    return option1.name === option2.name;
  }


  //crate from Group
  incomForm = new FormGroup({
    truckNo: new FormControl('', Validators.required),
    fuel: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    discriminations: new FormControl('', Validators.required),
    companies: new FormControl('', Validators.required),
    locales: new FormControl('', Validators.required),
    invoiceNo: new FormControl('', Validators.required),
    shippingDate: new FormControl('', Validators.required),
    
  });
  
  constructor(
    public dialogRef: MatDialogRef<IncomeFormComponent>,
    private incomServic: IcomeService,
    private notificatin: NotificationService,
    private fuleservice: FuelService,
    private companys: CompaniesService,
    private discrimations: DiscrimintionsService,
    private localser: LocalsService,
    @Inject(MAT_DIALOG_DATA) public editeData: any
  ) { }

  ngOnInit(): void {
     //call company,fuel,dicri,local data
     this.getfuels();
     this.getAllCompanies();
     this.getAlldiscimi();
     this.getAlllocals();
 
    
 
     if (this.editeData) {
       this.actionTitel = 'Modify Record';
       this.actionBtn = 'Update';
 
       this.incomForm.controls['truckNo'].setValue(this.editeData.truckNo);
       this.incomForm.controls['fuel'].setValue(this.editeData.fuel);
       this.incomForm.controls['quantity'].setValue(this.editeData.quantity);
       this.incomForm.controls['discriminations'].setValue(
         this.editeData.discriminations);
       this.incomForm.controls['companies'].setValue(this.editeData.companies);
       this.incomForm.controls['locales'].setValue(this.editeData.locales);
       this.incomForm.controls['invoiceNo'].setValue(this.editeData.invoiceNo);
       this.incomForm.controls['shippingDate'].setValue(this.editeData.shippingDate);
       
     }
  }


  onCreate() {
    if (!this.editeData) {
      if (this.incomForm.valid) {
        this.incomServic.postIncom(this.incomForm.value).subscribe({
          next: (_res) => {
            this.sendNotification(NotificationType.SUCCESS,'Incom Fuel Saved Successfuly');
          
            this.dialogRef.close();
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
            this.dialogRef.close();
          },
        });
      }
    } else {
      this.onUdateIncome();
    }
  }

  onUdateIncome() {
    this.incomServic
      .putIncome(this.incomForm.value, this.editeData.incomeId)
      .subscribe({
        next: (_res) => {
          this.sendNotification(NotificationType.SUCCESS,'Incom Fuel Update  Successfuly');
         
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
    this.incomForm.reset();
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

  //Method to get all Locals
  getAlllocals() {
    this.localser.getAlllocal().subscribe({
      next: (res) => {
        this.localsData = res;
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

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompaniesService } from 'src/app/service/companies.service';
import { DiscrimintionsService } from 'src/app/service/discrimintions.service';
import { FuelService } from 'src/app/service/fuel.service';
import { LocalsService } from 'src/app/service/locals.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TransitsService } from 'src/app/service/transits.service';
import { NotificationType } from '../enum/notification-type.enum';
import { Company } from '../model/companies';
import { discriminations } from '../model/discriminations';
import { fuel } from '../model/fuel';
import { locals } from '../model/locals';

@Component({
  selector: 'app-trinst-form',
  templateUrl: './trinst-form.component.html',
  styleUrls: ['./trinst-form.component.css']
})
export class TrinstFormComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  fuelDate: fuel[] = [];
  companyDate: Company[] = [];
  discrimitionDate: discriminations[] = [];
  localsData: locals[] = [];
  transitId!: string;

   //crate from Group
   trinsitForm = new FormGroup({
    truckNo: new FormControl('', Validators.required),
    fuel: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    companies: new FormControl('', Validators.required),
    shepmetDirection: new FormControl('', Validators.required),
    agentName: new FormControl('', Validators.required),
  });
  
  constructor(
    public dialogRef: MatDialogRef<TrinstFormComponent>,
    private transitService: TransitsService,
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
      this.transitId = this.editeData.transitId;

    this.trinsitForm.controls['truckNo'].setValue(this.editeData.truckNo);
    this.trinsitForm.controls['fuel'].setValue(this.editeData.fuel);
    this.trinsitForm.controls['quantity'].setValue(this.editeData.quntity);
    this.trinsitForm.controls['companies'].setValue(this.editeData.companies);
    this.trinsitForm.controls['shepmetDirection'].setValue(this.editeData.shepmetDirection);
    this.trinsitForm.controls['agentName'].setValue(this.editeData.agentName);

    }

  }

   //save Transit
   onCreate() {
    if (!this.editeData) {
      if (this.trinsitForm.valid) {
        this.transitService.postTransit(this.trinsitForm.value).subscribe({
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
    this.transitService
      .putTransit(this.trinsitForm.value, this.editeData.transitId)
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
    this.trinsitForm.reset();
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

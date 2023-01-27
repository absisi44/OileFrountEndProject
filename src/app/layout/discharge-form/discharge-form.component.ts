import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DischargeService } from 'src/app/service/discharge.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-discharge-form',
  templateUrl: './discharge-form.component.html',
  styleUrls: ['./discharge-form.component.css']
})
export class DischargeFormComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  companyId: any;
  public showLoading!: boolean;
  
   //crate from Group
   dischargeForm = new FormGroup({
    comManName: new FormControl('', Validators.required),
    empName: new FormControl('', Validators.required),
    
  });

  constructor(public dialogRef: MatDialogRef<DischargeFormComponent>,
    private dischargeServic:DischargeService,
    private notificatin: NotificationService,
    @Inject(MAT_DIALOG_DATA) public editeData: any) { }

  ngOnInit(): void {

    if (this.editeData) {
      this.actionTitel = 'Modify Record';
      this.actionBtn = 'Update';
      this.companyId = this.editeData.companyId;
      this.dischargeForm.controls['comManName'].setValue(this.editeData.comManName);
      this.dischargeForm.controls['empName'].setValue(this.editeData.empName);
    }
  }

  //save companies
  onCreate() {
    if (!this.editeData) {
      if (this.dischargeForm.valid) {
        this.dischargeServic.postdischarge(this.dischargeForm.value,this.editeData.income.incomeId).subscribe({
          next: (_res) => {
            this.sendNotification(NotificationType.SUCCESS,'Discharge Saved Successfuly');
            this.showLoading=false;
            this.dialogRef.close();
          },
          error: (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse)
            this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
            this.showLoading=false;
            this.dialogRef.close();
          },
        });
      }
    } else {
      this.onUdateCompany();
    }
  }

   //update transit 
   onUdateCompany() {
    this.dischargeServic.putdischarge(this.dischargeForm.value, this.editeData.incomeId)
      .subscribe({
        next: (_respones) => {
          this.notificatin.notify(NotificationType.SUCCESS,'Discharge Update  Successfuly ');
          this.showLoading=false;
          this.dialogRef.close();
        },
        error: (errorResponse: HttpErrorResponse) => {
          
          this.sendNotification(NotificationType.ERROR,errorResponse.error);
          this.showLoading=false;
        },
      });
  }

  onClose() {
    
    this.dialogRef.close();
  }

  onClear() {
    this.dischargeForm.reset();
    
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

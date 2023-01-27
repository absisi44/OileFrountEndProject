import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompaniesService } from 'src/app/service/companies.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { Company } from '../model/companies';

@Component({
  selector: 'app-cmpany-from',
  templateUrl: './cmpany-from.component.html',
  styleUrls: ['./cmpany-from.component.css']
})
export class CmpanyFromComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  companyId: any;
  public showLoading!: boolean;

   //crate from Group
   companyForm = new FormGroup({
    companyName: new FormControl('', Validators.required),
    
  });

  constructor(public dialogRef: MatDialogRef<CmpanyFromComponent>,
    private companyServic:CompaniesService,
    private notificatin: NotificationService,
    @Inject(MAT_DIALOG_DATA) public editeData: any) { }

  ngOnInit(): void {
    if (this.editeData) {
      this.actionTitel = 'Modify Record';
      this.actionBtn = 'Update';
      this.companyId = this.editeData.companyId;
      this.companyForm.controls['companyName'].setValue(this.editeData.companyName);
    }
  }

   //save companies
   onCreate() {
    if (!this.editeData) {
      if (this.companyForm.valid) {
        this.companyServic.postcompany(this.companyForm.value).subscribe({
          next: (_res) => {
            this.sendNotification(NotificationType.SUCCESS,'Company Saved Successfuly');
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
    this.companyServic.putcompany(this.companyForm.value, this.editeData.companyId)
      .subscribe({
        next: (_respones) => {
          this.notificatin.notify(NotificationType.SUCCESS,'Company Update  Successfuly ');
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
    this.companyForm.reset();
    
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

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DischargeService } from 'src/app/service/discharge.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-disfoemsave',
  templateUrl: './disfoemsave.component.html',
  styleUrls: ['./disfoemsave.component.css']
})
export class DisfoemsaveComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  companyId: any;
  public showLoading!: boolean;
  
   //crate from Group
   dischargeForm = new FormGroup({
    comManName: new FormControl('', Validators.required),
    empName: new FormControl('', Validators.required),
    
  });

  constructor(public dialogRef: MatDialogRef<DisfoemsaveComponent>,
    private dischargeServic:DischargeService,
    private notificatin: NotificationService,
    @Inject(MAT_DIALOG_DATA) public editeData: any) { }

  ngOnInit(): void {

    console.log(this.editeData)
  }

  onCreate(){
    if (this.dischargeForm.valid) {
      this.dischargeServic.postdischarge(this.dischargeForm.value,this.editeData).subscribe({
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

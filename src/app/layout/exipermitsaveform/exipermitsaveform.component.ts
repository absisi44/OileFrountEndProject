import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExitPremitService } from 'src/app/service/exit-premit.service';
import { IcomeService } from 'src/app/service/icome.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-exipermitsaveform',
  templateUrl: './exipermitsaveform.component.html',
  styleUrls: ['./exipermitsaveform.component.css']
})
export class ExipermitsaveformComponent implements OnInit {


  //crate from Group
  exitpForm = new FormGroup({

    fees: new FormControl('', Validators.required),
    reciptNo: new FormControl(''),
    checkBankNo: new FormControl(''),
    empName: new FormControl('', Validators.required),
   

  });


  constructor(public dialogRef: MatDialogRef<ExipermitsaveformComponent>,
    private exitpermitService: ExitPremitService,
    private notificatin: NotificationService,
    @Inject(MAT_DIALOG_DATA) public editeData: any,) { }

  ngOnInit(): void {

    
  }

  onCreate(){
    if (this.exitpForm.valid) {
      console.log(this.exitpForm.value)
      this.exitpermitService.postExitPermit(this.exitpForm.value,this.editeData).subscribe({
        next: (_res) => {
          this.sendNotification(NotificationType.SUCCESS,'Exit Permit Saved Successfuly')
          this.dialogRef.close();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
          this.dialogRef.close();
        },
      });
    }
  }

  onClose() {
    
    this.dialogRef.close();
  }

  onClear() {
    this.exitpForm.reset();
    
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

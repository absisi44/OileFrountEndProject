import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExitPremitService } from 'src/app/service/exit-premit.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-exitpermit-form',
  templateUrl: './exitpermit-form.component.html',
  styleUrls: ['./exitpermit-form.component.css']
})
export class ExitpermitFormComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  id: any;
  IncomeId:any;
  inid:any;

  //crate from Group
  exitpForm = new FormGroup({

    fees: new FormControl('', Validators.required),
    reciptNo: new FormControl(''),
    checkBankNo: new FormControl(''),
    empName: new FormControl('', Validators.required),
   

  });



  constructor(public dialogRef: MatDialogRef<ExitpermitFormComponent>,
    private exitpermitService: ExitPremitService,
    private notificatin: NotificationService,
    @Inject(MAT_DIALOG_DATA) public editeData: any,
    @Inject(MAT_DIALOG_DATA) public exitp: any,) { }

  ngOnInit(): void {
    
   // this.IncomeId=this.incomeService.incomeToE;
    //console.log(this.exitp)
   
      if (this.editeData) {
        this.actionTitel = 'Modify Record';
          
          this.actionBtn = 'Update';
        if(this.editeData.fees==null){
          this.actionBtn
        }
        this.exitpForm.controls['fees'].setValue(this.editeData.fees);
        this.exitpForm.controls['reciptNo'].setValue(this.editeData.reciptNo);
        this.exitpForm.controls['checkBankNo'].setValue(this.editeData.checkBankNo);
        this.exitpForm.controls['empName'].setValue(this.editeData.empName);
        
        
    
    }
   
}


 //save Exit Permit
 onCreate() {

  if (!this.editeData ) {
    if (this.exitpForm.valid) {
      
      this.exitpermitService.postExitPermit(this.exitpForm.value,this.exitp).subscribe({
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
  } else {
    this.onUdateexitpermit();
  }
}
  //update Exit Permit 
  onUdateexitpermit() {
    
    this.exitpermitService
    
      .putExitPermit(this.exitpForm.value, this.editeData.exitpermitId)
      .subscribe({
        next: (_res) => {
          this.sendNotification(NotificationType.SUCCESS,'ExitPermit Update  Successfuly')
          
          //this.incomForm.reset();
          this.dialogRef.close();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
        },
      });
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

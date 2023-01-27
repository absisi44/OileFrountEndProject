import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalsService } from 'src/app/service/locals.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-local-form',
  templateUrl: './local-form.component.html',
  styleUrls: ['./local-form.component.css']
})
export class LocalFormComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  locaId: any;

    //crate from Group
    localForm = new FormGroup({
      locaName: new FormControl('', Validators.required),
      
    });

  constructor(public dialogRef: MatDialogRef<LocalFormComponent>,
    private localServic:LocalsService,
    private notificatin: NotificationService,
    @Inject(MAT_DIALOG_DATA) public editeData: any) { }

  ngOnInit(): void {

    if (this.editeData) {
      this.actionTitel = 'Modify Record';
      this.actionBtn = 'Update';
      this.locaId = this.editeData.locaId;
      this.localForm.controls['locaName'].setValue(this.editeData.locaName);
    }
  }

  //save Transit
 onCreate() {
  if (!this.editeData) {
    if (this.localForm.valid) {
      this.localServic.postlocal(this.localForm.value).subscribe({
        next: (_res) => {
          this.sendNotification(NotificationType.SUCCESS,'Fuel Saved Successfuly');
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
    this.localServic
      .putlocal(this.localForm.value, this.editeData.locaId)
      .subscribe({
        next: (_res) => {
        
          this.sendNotification(NotificationType.SUCCESS,'Local Update  Successfuly');
          
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
    this.localForm.reset();
    
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

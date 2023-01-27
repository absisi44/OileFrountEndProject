import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiscrimintionsService } from 'src/app/service/discrimintions.service';
import { NotificationService } from 'src/app/service/notification.service';
import { DicrimListComponent } from '../dicrim-list/dicrim-list.component';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-dicrim-form',
  templateUrl: './dicrim-form.component.html',
  styleUrls: ['./dicrim-form.component.css']
})
export class DicrimFormComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  dicrId!: string;

   //crate from Group
   discrimiForm = new FormGroup({
    discrName: new FormControl('', Validators.required),
      
    });

  constructor(public dialogRef: MatDialogRef<DicrimFormComponent>,
    private discrimSrevic:DiscrimintionsService,
    private notificatin: NotificationService,
    @Inject(MAT_DIALOG_DATA) public editeData: any) { }

  ngOnInit(): void {
    if (this.editeData) {
      this.actionTitel = 'Modify Record';
      this.actionBtn = 'Update';
      this.dicrId = this.editeData.dicrId;
      this.discrimiForm.controls['discrName'].setValue(this.editeData.discrName);
    }
  }
  

   //save Transit
 onCreate() {
  if (!this.editeData) {
    if (this.discrimiForm.valid) {
      this.discrimSrevic.postdicrimi(this.discrimiForm.value).subscribe({
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
    this.onUdateDiscrimi();
  }
}

   //update transit 
   onUdateDiscrimi() {
    this.discrimSrevic.putdicrimi(this.discrimiForm.value, this.dicrId)
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
    this.discrimiForm.reset();
    
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
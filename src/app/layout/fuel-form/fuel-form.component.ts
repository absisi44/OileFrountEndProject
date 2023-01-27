import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuelService } from 'src/app/service/fuel.service';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-fuel-form',
  templateUrl: './fuel-form.component.html',
  styleUrls: ['./fuel-form.component.css']
})
export class FuelFormComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';
  fuelId!: string;

  //crate from Group
  fuelForm = new FormGroup({
    fuelName: new FormControl('', Validators.required),
  });

  constructor( public dialogRef: MatDialogRef<FuelFormComponent>,
    private fuelservis: FuelService,
    private notificatin: NotificationService,
    @Inject(MAT_DIALOG_DATA) public editeData: any) { }

  ngOnInit(): void {

    if (this.editeData) {
      this.actionTitel = 'Modify Record';
      this.actionBtn = 'Update';
      this.fuelId = this.editeData.fuelId;
      this.fuelForm.controls['fuelName'].setValue(this.editeData.fuelName);
    }
  }

   //save Transit
   onCreate() {
    if (!this.editeData) {
      if (this.fuelForm.valid) {
        this.fuelservis.postfuel(this.fuelForm.value).subscribe({
          next: (_res) => {
            
            this.sendNotification(NotificationType.SUCCESS,'Fuel Saved Successfuly');
            this.dialogRef.close();
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
          },
        });
      }
    } else {
      this.onUdateTransit();
    }
  }

  //update transit
  onUdateTransit() {
    this.fuelservis.putfuel(this.fuelForm.value, this.editeData.fuelId).subscribe({
      next: (_res) => {
        this.sendNotification(NotificationType.SUCCESS,'Fuel Update  Successfuly ');
      
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
    this.fuelForm.reset();
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

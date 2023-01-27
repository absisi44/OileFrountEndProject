import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confrom-dailo',
  templateUrl: './mat-confrom-dailo.component.html',
  styleUrls: ['./mat-confrom-dailo.component.css']
})
export class MatConfromDailoComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public  data:any, 
  public DialogRef:MatDialogRef<MatConfromDailoComponent>) { }

  ngOnInit(): void {
  }

  CloseDialog(){
    this.DialogRef.close();
    }

}

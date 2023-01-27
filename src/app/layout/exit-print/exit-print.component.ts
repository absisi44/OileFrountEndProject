import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-exit-print',
  templateUrl: './exit-print.component.html',
  styleUrls: ['./exit-print.component.css']
})
export class ExitPrintComponent implements OnInit {

  exitPermitprint:any;
  constructor( @Inject(MAT_DIALOG_DATA) public printData: any,
  public dialogRef: MatDialogRef<ExitPrintComponent>) { }

  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,top=0,left=0,fullscreen=yes',
    //pageTitle: 'Hello World',
    //templateString: '',
    //stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    //styles: ['.table { color: red; }', '.table td { color: green; }']
  }

  ngOnInit(): void {

    
    this.exitPermitprint=this.printData;

  }

  onClose() {
    //this.incomForm.reset();
    this.dialogRef.close();
  }

}

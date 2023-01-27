import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { CompaniesService } from 'src/app/service/companies.service';
import { DiscrimintionsService } from 'src/app/service/discrimintions.service';
import { FuelTicketDeptService } from 'src/app/service/fuel-ticket-dept.service';
import { FuelService } from 'src/app/service/fuel.service';

import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { Company } from '../model/companies';
import { discriminations } from '../model/discriminations';
import { fuel } from '../model/fuel';

@Component({
  selector: 'app-ticket-fdp-form',
  templateUrl: './ticket-fdp-form.component.html',
  styleUrls: ['./ticket-fdp-form.component.css']
})
export class TicketFdpFormComponent implements OnInit {

  actionBtn: string = 'Save';
  actionTitel: string = 'New Record';


  fuelControl = new FormControl<string | fuel>('');
  fuelDate: fuel[]=[] ;
  filteredfuel!: Observable<fuel[]>;


  companyControl = new FormControl<string | Company>('');
  filteredCopmany!: Observable<Company[]>;
  companyDate: Company[] = [];

  discrControl = new FormControl<string | discriminations>('');
  filteredDisc!: Observable<discriminations[]>;
  discrimitionDate: discriminations[] = [];



  ticketFdpForm = new FormGroup({

    quantity: new FormControl('', Validators.required),
    direcation: new FormControl('', Validators.required),
    benficiary: new FormControl('', Validators.required),
    fuel: new FormControl('', Validators.required),
    companies: new FormControl('', Validators.required),
    discriminations: new FormControl('', Validators.required),
    
  });
  

  constructor(
    private fuelTicketDeptService:FuelTicketDeptService,
    public dialogRef: MatDialogRef<TicketFdpFormComponent>,
    private notificatin: NotificationService,
    private fuleservice: FuelService,
    private companys: CompaniesService,
    private discrimations: DiscrimintionsService,
    @Inject(MAT_DIALOG_DATA) public editeData: any
  ) { }

  ngOnInit(): void {

     //call company,fuel,dicri,local data
     this.getfuels();
     this.getAllCompanies();
     this.getAlldiscimi();
     
     if (this.editeData) {
      this.actionTitel = 'Modify Record';
      this.actionBtn = 'Update';

      this.ticketFdpForm.controls['quantity'].setValue(this.editeData.quantity);
      this.ticketFdpForm.controls['direcation'].setValue(this.editeData.direcation);
      this.ticketFdpForm.controls['benficiary'].setValue(this.editeData.benficiary);
      this.ticketFdpForm.controls['fuel'].setValue(this.editeData.fuel);
      this.ticketFdpForm.controls['discriminations'].setValue(this.editeData.discriminations);
      this.ticketFdpForm.controls['companies'].setValue(this.editeData.companies);
    }

  //Fuel filter fuels data 
  this.filteredfuel = this.fuelControl.valueChanges.pipe(
    startWith(''),
    map(value => {
      const name = typeof value === 'string' ? value : value?.fuelName;
      return name ? this._filter(name as string) : this.fuelDate.slice();
    }),
  );
  //Fuel filter Company data 
  this.filteredCopmany = this.companyControl.valueChanges.pipe(
    startWith(''),
    map(value => {
      const name = typeof value === 'string' ? value : value?.companyName;
      return name ? this._filterCompany(name as string) : this.companyDate.slice();
    }),
  );
  //Fuel filter Dicrimiantion data 
  this.filteredDisc = this.discrControl.valueChanges.pipe(
    startWith(''),
    map(value => {
      const name = typeof value === 'string' ? value : value?.discrName;
      return name ? this._filterDicrim(name as string) : this.discrimitionDate.slice();
    }),
  );
      
  }
 

 //Fuel filter fuels data 
  displayFn(fueldata: fuel): string {
    return fueldata && fueldata.fuelName ? fueldata.fuelName : '';
  }

 //Fuel filter fuels data 
  private _filter(name: string): fuel[] {
    const filterValue = name.toLowerCase();

    return this.fuelDate.filter(option => option.fuelName.toLowerCase().includes(filterValue));
  }


 //Fuel filter company data 
  displayFnCompany(Company: Company): string {
    return Company && Company.companyName ? Company.companyName : '';
  }

 //Fuel filter company data 
  private _filterCompany(name: string): Company[] {
    const filterValue = name.toLowerCase();

    return this.companyDate.filter(option => option.companyName.toLowerCase().includes(filterValue));
  }
 //Fuel filter Dicrim data 
  displayDicrim(dicrimi: discriminations): string {
    return dicrimi && dicrimi.discrName ? dicrimi.discrName : '';
  }

 //Fuel filter Dicrim data 
  private _filterDicrim(name: string): discriminations[] {
    const filterValue = name.toLowerCase();

    return this.discrimitionDate.filter(option => option.discrName.toLowerCase().includes(filterValue));
  }


  onCreate() {
    if (!this.editeData) {
      if (this.ticketFdpForm.valid) {
        this.fuelTicketDeptService.postFuelTicketDept(this.ticketFdpForm.value).subscribe({
          next: (_res) => {
            this.sendNotification(NotificationType.SUCCESS,'Incom Fuel Saved Successfuly');
          
            this.dialogRef.close();
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
            this.dialogRef.close();
          },
        });
      }
    } else {
      this.onUdateIncome();
    }
  }


  onUdateIncome() {
    this.fuelTicketDeptService
      .putFuelTicketDept(this.ticketFdpForm.value, this.editeData.fueltiketfId)
      .subscribe({
        next: (_res) => {
          this.sendNotification(NotificationType.SUCCESS,'Incom Fuel Update  Successfuly');
         
          //this.fuelTicketDept.reset();
          this.dialogRef.close();
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
        },
      });
  }

  onClose() {
    //this.fuelTicketDept.reset();
    this.dialogRef.close();
  }

  onClear() {
    this.ticketFdpForm.reset();
    //this.initializeFormincom();
  }

   //Method to get all fuels
   getfuels() {
    this.fuleservice.getAllfuel().subscribe({
      next: (res) => {
        this.fuelDate = res;
       
        
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
      },
    });
  }

  //Method to get all copmanies
  getAllCompanies() {
    this.companys.getAllcompany().subscribe({
      next: (res) => {
        this.companyDate = res;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
      },
    });
  }

  //Method to get all discrimation
  getAlldiscimi() {
    this.discrimations.getAlldicrimi().subscribe({
      next: (res) => {
        this.discrimitionDate = res;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR,errorResponse.error.message);
      },
    });
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

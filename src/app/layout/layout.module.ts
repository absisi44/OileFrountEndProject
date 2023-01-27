import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpanyFromComponent } from './cmpany-from/cmpany-from.component';
import { CmpanyListComponent } from './cmpany-list/cmpany-list.component';
import { FuelFormComponent } from './fuel-form/fuel-form.component';
import { FuelListComponent } from './fuel-list/fuel-list.component';
import { LocalFormComponent } from './local-form/local-form.component';
import { LocalListComponent } from './local-list/local-list.component';
import { DicrimFormComponent } from './dicrim-form/dicrim-form.component';
import { DicrimListComponent } from './dicrim-list/dicrim-list.component';
import { TrinstFormComponent } from './trinst-form/trinst-form.component';
import { TrinstListComponent } from './trinst-list/trinst-list.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { NotificationModule } from '../notification.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatConfromDailoComponent } from './mat-confrom-dailo/mat-confrom-dailo.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { ExitpermitFormComponent } from './exitpermit-form/exitpermit-form.component';
import { ExitpermitListComponent } from './exitpermit-list/exitpermit-list.component';
import { LisIncomeComponent } from './lis-income/lis-income.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { DischargeListComponent } from './discharge-list/discharge-list.component';
import { DischargeFormComponent } from './discharge-form/discharge-form.component';
import { TicketStationFormComponent } from './ticket-station-form/ticket-station-form.component';
import { TicketStationListComponent } from './ticket-station-list/ticket-station-list.component';
import { TicketFdpListComponent } from './ticket-fdp-list/ticket-fdp-list.component';
import { TicketFdpFormComponent } from './ticket-fdp-form/ticket-fdp-form.component';
import { ExipermitsaveformComponent } from './exipermitsaveform/exipermitsaveform.component';
import { ListInfstockComponent } from './list-infstock/list-infstock.component';
import { DisfoemsaveComponent } from './disfoemsave/disfoemsave.component';
import { ExitPrintComponent } from './exit-print/exit-print.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { NotifierModule } from 'angular-notifier';




@NgModule({
  declarations: [
    CmpanyFromComponent,
    CmpanyListComponent,
    FuelFormComponent,
    FuelListComponent,
    LocalFormComponent,
    LocalListComponent,
    DicrimFormComponent,
    DicrimListComponent,
    TrinstFormComponent,
    TrinstListComponent,
    HomeComponent,
    MatConfromDailoComponent,
    IncomeFormComponent,
    IncomeListComponent,
    ExitpermitFormComponent,
    ExitpermitListComponent,
    LisIncomeComponent,
    StockFormComponent,
    StockListComponent,
    DischargeListComponent,
    DischargeFormComponent,
    TicketStationFormComponent,
    TicketStationListComponent,
    TicketFdpListComponent,
    TicketFdpFormComponent,
    ExipermitsaveformComponent,
    ListInfstockComponent,
    DisfoemsaveComponent,
    ExitPrintComponent,
    
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NotificationModule,
    FontAwesomeModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPrintElementModule,
    NotifierModule
    
   
    
  ],
  exports:[
    CommonModule,
    MaterialModule,
    NotificationModule,
    FontAwesomeModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    
    
  ],
  entryComponents:[MatConfromDailoComponent]
})
export class LayoutModule { }

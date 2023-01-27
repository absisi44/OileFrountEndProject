import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmpanyListComponent } from './layout/cmpany-list/cmpany-list.component';
import { DicrimListComponent } from './layout/dicrim-list/dicrim-list.component';
import { DischargeListComponent } from './layout/discharge-list/discharge-list.component';
import { ExitpermitListComponent } from './layout/exitpermit-list/exitpermit-list.component';
import { FuelListComponent } from './layout/fuel-list/fuel-list.component';
import { HomeComponent } from './layout/home/home.component';
import { IncomeListComponent } from './layout/income-list/income-list.component';
import { LocalListComponent } from './layout/local-list/local-list.component';
import { StockListComponent } from './layout/stock-list/stock-list.component';
import { TicketFdpListComponent } from './layout/ticket-fdp-list/ticket-fdp-list.component';
import { TrinstListComponent } from './layout/trinst-list/trinst-list.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'fuel', component:FuelListComponent},
  {path:'company', component:CmpanyListComponent},
  {path:'discrimination', component:DicrimListComponent},
  {path:'locals', component:LocalListComponent},
  {path:'transit', component:TrinstListComponent},
  {path:'income', component:IncomeListComponent},
  {path:'exitpermit', component:ExitpermitListComponent},
  {path:'stock', component:StockListComponent},
  {path:'dischage', component:DischargeListComponent},
  {path:'fuelTicktDept', component:TicketFdpListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

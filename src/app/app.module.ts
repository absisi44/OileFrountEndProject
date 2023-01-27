import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { MaterialModule } from './material/material.module';
import { SidenaveComponent } from './layout/sidenave/sidenave.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { HeaderComponent } from './layout/header/header.component';
import { NotificationModule } from './notification.module';



@NgModule({
  declarations: [
    AppComponent,
    SidenaveComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    NotificationModule,
   
  ],
  exports:[ LayoutModule],
  providers: [NotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }

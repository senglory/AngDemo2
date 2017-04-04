import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AlertModule } from 'ng2-bootstrap';

import { DatepickerModule } from 'angular2-material-datepicker';
import { SessionService } from './services/session.service';

import { AboutComponent } from './home/about.component';
import { RegisterComponent } from './home/register.component';
import { LoginComponent } from './home/login.component';
import { ContactComponent } from './home/contact.component';
import { MasterComponent } from './shared/master.component';
import { HomeComponent } from './home/home.component';
import { ImportCustomersComponent } from './home/import-customers.component';
import { CustomerInquiryComponent } from './customer/customer-inquiry.component';
import { CustomerMaintenanceComponent } from './customer/customer-maintenance.component';
import { UserProfileComponent } from './user/user-profile.component';
import { AppComponent } from './application.component';
import { AlertBoxComponent } from './shared/alertbox.component';
import { AddressComponent } from './shared/address.component';
import { InGermany } from './customer/cludge';
import { OutOfGermany } from './customer/out-of-germany';
import { DienstSelector } from './customer/dienst-selector';
import { AuthorizationGuard } from './authorization-guard';
import { DataGrid } from './shared/datagrid/datagrid.component';
import { AppRoutes } from './application-routes';
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';


@NgModule({
    imports: [
        BrowserModule, 
        FormsModule, 
        DatepickerModule,
        HttpModule,
        RouterModule.forRoot(AppRoutes),
        AlertModule
    ],
    declarations: [
        DataGrid,
        InGermany,
        DienstSelector,
        OutOfGermany,
        AddressComponent,
        AlertBoxComponent,
        RegisterComponent,
        LoginComponent,
        MasterComponent, 
        AppComponent,
        HomeComponent,
        AboutComponent,
        ImportCustomersComponent,
        CustomerInquiryComponent,
        CustomerMaintenanceComponent,
        UserProfileComponent,
        ContactComponent
    ],
    providers: [
        AuthorizationGuard,
        SessionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
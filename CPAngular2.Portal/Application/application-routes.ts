import { Routes } from "@angular/router";
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
import { SessionService } from './services/session.service';

import { authorizationProviders } from "./authorization-providers";
import { AuthorizationGuard } from "./authorization-guard";

export const AppRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home/about', component: AboutComponent },
    { path: 'home/contact', component: ContactComponent },
    { path: 'home/home', component: HomeComponent },
    { path: 'home/register', component: RegisterComponent },
    { path: 'home/login', component: LoginComponent },
    { path: 'home/importcustomers', component: ImportCustomersComponent },
    { path: 'customer/customerinquiry', component: CustomerInquiryComponent, canActivate: [AuthorizationGuard] },
    { path: 'customer/customermaintenance', component: CustomerMaintenanceComponent, canActivate: [AuthorizationGuard] },
    { path: 'customer/customermaintenance/:id', component: CustomerMaintenanceComponent, canActivate: [AuthorizationGuard] },
    { path: 'user/profile', component: UserProfileComponent, canActivate: [AuthorizationGuard] }
];
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var about_component_1 = require("./home/about.component");
var register_component_1 = require("./home/register.component");
var login_component_1 = require("./home/login.component");
var contact_component_1 = require("./home/contact.component");
var home_component_1 = require("./home/home.component");
var import_customers_component_1 = require("./home/import-customers.component");
var customer_inquiry_component_1 = require("./customer/customer-inquiry.component");
var customer_maintenance_component_1 = require("./customer/customer-maintenance.component");
var user_profile_component_1 = require("./user/user-profile.component");
var authorization_guard_1 = require("./authorization-guard");
exports.AppRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'home/about', component: about_component_1.AboutComponent },
    { path: 'home/contact', component: contact_component_1.ContactComponent },
    { path: 'home/home', component: home_component_1.HomeComponent },
    { path: 'home/register', component: register_component_1.RegisterComponent },
    { path: 'home/login', component: login_component_1.LoginComponent },
    { path: 'home/importcustomers', component: import_customers_component_1.ImportCustomersComponent },
    { path: 'customer/customerinquiry', component: customer_inquiry_component_1.CustomerInquiryComponent, canActivate: [authorization_guard_1.AuthorizationGuard] },
    { path: 'customer/customermaintenance', component: customer_maintenance_component_1.CustomerMaintenanceComponent, canActivate: [authorization_guard_1.AuthorizationGuard] },
    { path: 'customer/customermaintenance/:id', component: customer_maintenance_component_1.CustomerMaintenanceComponent, canActivate: [authorization_guard_1.AuthorizationGuard] },
    { path: 'user/profile', component: user_profile_component_1.UserProfileComponent, canActivate: [authorization_guard_1.AuthorizationGuard] }
];
//# sourceMappingURL=application-routes.js.map
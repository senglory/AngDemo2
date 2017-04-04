"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var angular2_material_datepicker_1 = require("angular2-material-datepicker");
var session_service_1 = require("./services/session.service");
var about_component_1 = require("./home/about.component");
var register_component_1 = require("./home/register.component");
var login_component_1 = require("./home/login.component");
var contact_component_1 = require("./home/contact.component");
var master_component_1 = require("./shared/master.component");
var home_component_1 = require("./home/home.component");
var import_customers_component_1 = require("./home/import-customers.component");
var customer_inquiry_component_1 = require("./customer/customer-inquiry.component");
var customer_maintenance_component_1 = require("./customer/customer-maintenance.component");
var user_profile_component_1 = require("./user/user-profile.component");
var application_component_1 = require("./application.component");
var alertbox_component_1 = require("./shared/alertbox.component");
var address_component_1 = require("./shared/address.component");
var cludge_1 = require("./customer/cludge");
var out_of_germany_1 = require("./customer/out-of-germany");
var dienst_selector_1 = require("./customer/dienst-selector");
var authorization_guard_1 = require("./authorization-guard");
var datagrid_component_1 = require("./shared/datagrid/datagrid.component");
var application_routes_1 = require("./application-routes");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            angular2_material_datepicker_1.DatepickerModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot(application_routes_1.AppRoutes),
            ng2_bootstrap_1.AlertModule
        ],
        declarations: [
            datagrid_component_1.DataGrid,
            cludge_1.InGermany,
            dienst_selector_1.DienstSelector,
            out_of_germany_1.OutOfGermany,
            address_component_1.AddressComponent,
            alertbox_component_1.AlertBoxComponent,
            register_component_1.RegisterComponent,
            login_component_1.LoginComponent,
            master_component_1.MasterComponent,
            application_component_1.AppComponent,
            home_component_1.HomeComponent,
            about_component_1.AboutComponent,
            import_customers_component_1.ImportCustomersComponent,
            customer_inquiry_component_1.CustomerInquiryComponent,
            customer_maintenance_component_1.CustomerMaintenanceComponent,
            user_profile_component_1.UserProfileComponent,
            contact_component_1.ContactComponent
        ],
        providers: [
            authorization_guard_1.AuthorizationGuard,
            session_service_1.SessionService
        ],
        bootstrap: [application_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var address_entity_1 = require("../entities/address.entity");
var customer_entity_1 = require("../entities/customer.entity");
var customer_service_1 = require("../services/customer.service");
var alert_service_1 = require("../services/alert.service");
var session_service_1 = require("../services/session.service");
var ngx_uploader_1 = require("ngx-uploader");
//import { ImageUploadModule } from 'ng2-imageupload';
//import { NgUploaderModule } from 'ngx-uploader';
//import { NgModule }      from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { AppComponent }  from './app.component';
exports.debugVersion = "?version=" + Date.now();
var CustomerMaintenanceComponent = (function () {
    function CustomerMaintenanceComponent(
        //private zone: NgZone,
        route, customerService, sessionService, alertService) {
        this.route = route;
        this.customerService = customerService;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.title = 'Provider Maintenance';
        this.schedule = [];
        this.alerts = [];
        this.sizeLimit = 1000000; // 1MB
        this.options = new ngx_uploader_1.NgUploaderOptions({
            url: 'http://api.ngx-uploader.com/upload',
            filterExtensions: true,
            allowedExtensions: ['jpg', 'png'],
            data: { userId: 12 },
            autoUpload: false,
            fieldName: 'file',
            fieldReset: true,
            maxUploads: 2,
            method: 'POST',
            previewUrl: false,
            withCredentials: false
        });
        this.inputUploadEvents = new core_1.EventEmitter();
    }
    CustomerMaintenanceComponent.prototype.startUpload = function () {
        this.inputUploadEvents.emit('startUpload');
    };
    CustomerMaintenanceComponent.prototype.beforeUpload = function (uploadingFile) {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.errorMessage = 'File is too large!';
        }
    };
    CustomerMaintenanceComponent.prototype.handleUpload = function (data) {
        setTimeout(function () {
            //this.zone.run(() => {
            //    this.response = data;
            //    if (data && data.response) {
            //        this.response = JSON.parse(data.response);
            //    }
            //});
        });
    };
    CustomerMaintenanceComponent.prototype.handlePreviewData = function (data) {
        this.previewData = data;
    };
    CustomerMaintenanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showUpdateButton = false;
        this.showAddButton = false;
        this.address = new address_entity_1.Address();
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            if (id != undefined) {
                _this.customerID = parseInt(id);
                var customer = new customer_entity_1.Customer();
                customer.customerID = _this.customerID;
                _this.customerService.getCustomer(customer)
                    .subscribe(function (response) { return _this.getCustomerOnSuccess(response); }, function (response) { return _this.getCustomerOnError(response); });
            }
            else {
                _this.customerID = 0;
                _this.showAddButton = true;
                _this.showUpdateButton = false;
            }
        });
    };
    CustomerMaintenanceComponent.prototype.getCustomerOnSuccess = function (response) {
        this.customerCode = response.customerCode;
        this.companyVorname = response.companyVorname;
        this.companyName = response.companyName;
        this.phoneNumber = response.phoneNumber;
        this.eMail = response.eMail;
        this.address.addressLine1 = response.addressLine1;
        this.address.addressLine2 = response.addressLine2;
        this.address.city = response.city;
        this.address.state = response.state;
        this.address.zipCode = response.zipCode;
        this.showUpdateButton = true;
        this.showAddButton = false;
    };
    CustomerMaintenanceComponent.prototype.getCustomerOnError = function (response) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);
    };
    CustomerMaintenanceComponent.prototype.updateCustomer = function () {
        var _this = this;
        var customer = new customer_entity_1.Customer();
        customer.customerID = this.customerID;
        customer.Abteilung = this.Abteilung;
        customer.salutation = this.salutation;
        customer.customerCode = this.customerCode;
        customer.companyVorname = this.companyVorname;
        customer.companyName = this.companyName;
        customer.phoneNumber = this.phoneNumber;
        customer.phoneNumber2 = this.phoneNumber2;
        customer.eMail = this.eMail;
        customer.addressLine1 = this.address.addressLine1;
        customer.addressLine2 = this.address.addressLine2;
        customer.city = this.address.city;
        customer.state = this.address.state;
        customer.zipCode = this.address.zipCode;
        customer.photo = this.photo;
        this.clearInputErrors();
        this.customerService.updateCustomer(customer)
            .subscribe(function (response) { return _this.updateCustomerOnSuccess(response); }, function (response) { return _this.updateCustomerOnError(response); });
    };
    CustomerMaintenanceComponent.prototype.updateCustomerOnSuccess = function (response) {
        if (this.customerID == 0) {
            this.customerID = response.customerID;
            this.showAddButton = false;
            this.showUpdateButton = true;
        }
        this.alertService.renderSuccessMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    };
    CustomerMaintenanceComponent.prototype.updateCustomerOnError = function (response) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);
    };
    CustomerMaintenanceComponent.prototype.clearInputErrors = function () {
        this.customerCodeInputError = false;
        this.companyNameInputError = false;
        this.salutationInputError = false;
    };
    return CustomerMaintenanceComponent;
}());
CustomerMaintenanceComponent = __decorate([
    core_1.Component({
        templateUrl: 'application/customer/customer-maintenance.component.html' + exports.debugVersion,
        providers: [alert_service_1.AlertService],
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        customer_service_1.CustomerService,
        session_service_1.SessionService,
        alert_service_1.AlertService])
], CustomerMaintenanceComponent);
exports.CustomerMaintenanceComponent = CustomerMaintenanceComponent;
//# sourceMappingURL=customer-maintenance.component.js.map
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
var alert_service_1 = require("../services/alert.service");
var customer_service_1 = require("../services/customer.service");
var customer_entity_1 = require("../entities/customer.entity");
exports.debugVersion = "?version=" + Date.now();
var ImportCustomersComponent = (function () {
    function ImportCustomersComponent(customerService, alertService) {
        this.customerService = customerService;
        this.alertService = alertService;
        this.title = 'Import Customers';
        this.alerts = [];
    }
    ImportCustomersComponent.prototype.ngOnInit = function () { };
    ImportCustomersComponent.prototype.importCustomers = function () {
        var _this = this;
        var customer = new customer_entity_1.Customer();
        this.customerService.importCustomers(customer)
            .subscribe(function (response) { return _this.importCustomersOnSuccess(response); }, function (response) { return _this.importCustomersOnError(response); });
    };
    ImportCustomersComponent.prototype.importCustomersOnSuccess = function (response) {
        this.alertService.renderSuccessMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    };
    ImportCustomersComponent.prototype.importCustomersOnError = function (response) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    };
    return ImportCustomersComponent;
}());
ImportCustomersComponent = __decorate([
    core_1.Component({
        templateUrl: 'application/home/import-customers.component.html' + exports.debugVersion,
        providers: [customer_service_1.CustomerService, alert_service_1.AlertService],
    }),
    __metadata("design:paramtypes", [customer_service_1.CustomerService, alert_service_1.AlertService])
], ImportCustomersComponent);
exports.ImportCustomersComponent = ImportCustomersComponent;
//# sourceMappingURL=import-customers.component.js.map
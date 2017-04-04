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
var user_entity_1 = require("../entities/user.entity");
var address_entity_1 = require("../entities/address.entity");
var user_service_1 = require("../services/user.service");
var alert_service_1 = require("../services/alert.service");
var session_service_1 = require("../services/session.service");
var router_1 = require("@angular/router");
exports.debugVersion = "?version=" + Date.now();
var UserProfileComponent = (function () {
    function UserProfileComponent(userService, sessionService, alertService, router) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.router = router;
        this.title = 'User Profile';
        this.alerts = [];
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        this.address = new address_entity_1.Address();
        this.firstName = this.sessionService.firstName;
        this.lastName = this.sessionService.lastName;
        this.address.addressLine1 = this.sessionService.addressLine1;
        this.address.addressLine2 = this.sessionService.addressLine2;
        this.address.city = this.sessionService.city;
        this.address.state = this.sessionService.state;
        this.address.zipCode = this.sessionService.zipCode;
    };
    UserProfileComponent.prototype.clearInputErrors = function () {
        this.firstNameInputError = false;
        this.lastNameInputError = false;
    };
    UserProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        var user = new user_entity_1.User();
        user.firstName = this.firstName;
        user.lastName = this.lastName;
        user.addressLine1 = this.address.addressLine1;
        user.addressLine2 = this.address.addressLine2;
        user.city = this.address.city;
        user.state = this.address.state;
        user.zipCode = this.address.zipCode;
        this.clearInputErrors();
        this.userService.updateProfile(user)
            .subscribe(function (response) { return _this.updateProfileSuccess(response); }, function (response) { return _this.updateProfileOnError(response); });
    };
    UserProfileComponent.prototype.updateProfileSuccess = function (response) {
        this.alertService.renderSuccessMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.sessionService.firstName = this.firstName;
        this.sessionService.lastName = this.lastName;
        this.sessionService.addressLine1 = this.address.addressLine1;
        this.sessionService.addressLine2 = this.address.addressLine2;
        this.sessionService.city = this.address.city;
        this.sessionService.state = this.address.state;
        this.sessionService.zipCode = this.address.zipCode;
    };
    UserProfileComponent.prototype.updateProfileOnError = function (response) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);
    };
    return UserProfileComponent;
}());
UserProfileComponent = __decorate([
    core_1.Component({
        templateUrl: 'application/user/user-profile.component.html' + exports.debugVersion,
        providers: [alert_service_1.AlertService],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, session_service_1.SessionService, alert_service_1.AlertService, router_1.Router])
], UserProfileComponent);
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map
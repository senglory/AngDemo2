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
var user_service_1 = require("../services/user.service");
var http_service_1 = require("../services/http.service");
var session_service_1 = require("../services/session.service");
var alert_service_1 = require("../services/alert.service");
var router_1 = require("@angular/router");
exports.debugVersion = "?version=" + Date.now();
var RegisterComponent = (function () {
    function RegisterComponent(userService, sessionService, alertService, router) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.router = router;
        this.title = 'Register';
        this.fullName = "";
        this.firstName = "";
        this.lastName = "";
        this.emailAddress = "";
        this.password = "";
        this.passwordConfirmation = "";
        this.alerts = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.clearInputErrors();
    };
    RegisterComponent.prototype.registerUser = function ($event) {
        var _this = this;
        var user = new user_entity_1.User();
        user.emailAddress = this.emailAddress;
        user.firstName = this.firstName;
        user.lastName = this.lastName;
        user.password = this.password;
        user.passwordConfirmation = this.passwordConfirmation;
        this.clearInputErrors();
        this.userService.registerUser(user)
            .subscribe(function (response) { return _this.registerUserOnSuccess(response); }, function (response) { return _this.registerUserOnError(response); });
    };
    RegisterComponent.prototype.clearInputErrors = function () {
        this.firstNameInputError = false;
        this.lastNameInputError = false;
        this.emailAddressInputError = false;
        this.passwordInputError = false;
        this.passwordConfirmationInputError = false;
    };
    RegisterComponent.prototype.registerUserOnSuccess = function (response) {
        var user = new user_entity_1.User();
        user.userID = response.userID;
        user.emailAddress = response.emailAddress;
        user.firstName = response.firstName;
        user.lastName = response.lastName;
        this.sessionService.authenicated(user);
        this.router.navigate(['/home/home']);
    };
    RegisterComponent.prototype.registerUserOnError = function (response) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        templateUrl: 'application/home/register.component.html' + exports.debugVersion,
        providers: [user_service_1.UserService, http_service_1.HttpService, alert_service_1.AlertService],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, session_service_1.SessionService, alert_service_1.AlertService, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map
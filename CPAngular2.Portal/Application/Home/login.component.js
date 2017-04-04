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
var alert_service_1 = require("../services/alert.service");
var session_service_1 = require("../services/session.service");
var router_1 = require("@angular/router");
exports.debugVersion = "?version=" + Date.now();
var LoginComponent = (function () {
    function LoginComponent(userService, sessionService, alertService, router) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.router = router;
        this.title = 'Login';
        this.emailAddress = "";
        this.password = "";
        this.alerts = [];
    }
    LoginComponent.prototype.login = function ($event) {
        var _this = this;
        var user = new user_entity_1.User();
        user.emailAddress = this.emailAddress;
        user.password = this.password;
        this.userService.login(user)
            .subscribe(function (response) { return _this.loginOnSuccess(response); }, function (response) { return _this.loginOnError(response); });
    };
    LoginComponent.prototype.loginOnSuccess = function (response) {
        this.sessionService.authenicated(response);
        this.router.navigate(['/home/home']);
    };
    LoginComponent.prototype.loginOnError = function (response) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        templateUrl: 'application/home/login.component.html' + exports.debugVersion,
        providers: [user_service_1.UserService, http_service_1.HttpService, alert_service_1.AlertService],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, session_service_1.SessionService, alert_service_1.AlertService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
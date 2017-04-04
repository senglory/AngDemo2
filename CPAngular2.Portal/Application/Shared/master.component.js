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
var session_service_1 = require("../services/session.service");
var user_entity_1 = require("../entities/user.entity");
var user_service_1 = require("../services/user.service");
var customer_service_1 = require("../services/customer.service");
var http_service_1 = require("../services/http.service");
var blockui_service_1 = require("../services/blockui.service");
exports.debugVersion = "?version=" + Date.now();
var MasterComponent = (function () {
    function MasterComponent(sessionService, applicationRef, userService, blockUIService, router) {
        this.sessionService = sessionService;
        this.applicationRef = applicationRef;
        this.userService = userService;
        this.blockUIService = blockUIService;
        this.router = router;
        this.isAuthenicated = false;
        router.events.subscribe(function (uri) {
            // applicationRef.zone.run(() => applicationRef.tick());          /// bug fix when hitting the back button in Internet Explorer  
        });
    }
    MasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.version = this.version;
        this.sessionService.sessionEvent.subscribe(function (user) { return _this.onAuthenication(user); });
        this.blockUIService.blockUIEvent.subscribe(function (event) { return _this.blockUnBlockUI(event); });
        this.blockUIService.blockUIEvent.emit({
            value: true
        });
        var user = new user_entity_1.User();
        this.userService.authenicate(user)
            .subscribe(function (response) { return _this.authenicateOnSuccess(response); }, function (response) { return _this.authenicateOnError(response); });
    };
    MasterComponent.prototype.blockUnBlockUI = function (event) {
        this.blockUI = event.value;
    };
    MasterComponent.prototype.authenicateOnSuccess = function (response) {
        this.blockUIService.blockUIEvent.emit({
            value: false
        });
        if (response.returnStatus == false) {
            return;
        }
        var user = new user_entity_1.User();
        user.emailAddress = response.emailAddress;
        user.firstName = response.firstName;
        user.lastName = response.lastName;
        user.addressLine1 = response.addressLine1;
        user.addressLine2 = response.addressLine2;
        user.city = response.city;
        user.state = response.state;
        user.zipCode = response.zipCode;
        this.sessionService.authenicated(user);
        if (this.currentRoute == "/") {
            this.router.navigate(['/home/home']);
            return;
        }
        else {
            this.router.navigate([this.currentRoute]);
        }
    };
    MasterComponent.prototype.authenicateOnError = function (response) {
        this.isAuthenicated = false;
        this.blockUIService.blockUIEvent.emit({
            value: false
        });
    };
    MasterComponent.prototype.onAuthenication = function (user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.isAuthenicated = true;
    };
    MasterComponent.prototype.logout = function () {
        this.firstName = "";
        this.lastName = "";
        this.isAuthenicated = false;
        this.sessionService.logout();
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("CodeProjectAngular2Token", "");
        }
        this.router.navigate(['/home/home']);
    };
    return MasterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MasterComponent.prototype, "currentRoute", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MasterComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MasterComponent.prototype, "version", void 0);
MasterComponent = __decorate([
    core_1.Component({
        selector: 'master',
        templateUrl: 'application/shared/master.component.html' + exports.debugVersion,
        providers: [user_service_1.UserService, customer_service_1.CustomerService, http_service_1.HttpService, blockui_service_1.BlockUIService]
    }),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        core_1.ApplicationRef,
        user_service_1.UserService,
        blockui_service_1.BlockUIService,
        router_1.Router])
], MasterComponent);
exports.MasterComponent = MasterComponent;
//# sourceMappingURL=master.component.js.map
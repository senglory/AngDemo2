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
var http_service_1 = require("./http.service");
var UserService = (function () {
    function UserService(httpService) {
        this.httpService = httpService;
    }
    UserService.prototype.registerUser = function (user) {
        var url = "api/users/registerUser";
        return this.httpService.httpPost(user, url);
    };
    UserService.prototype.login = function (user) {
        var url = "api/users/login";
        return this.httpService.httpPost(user, url);
    };
    UserService.prototype.authenicate = function (user) {
        var url = "api/users/Authenicate";
        return this.httpService.httpPostWithNoBlock(user, url);
    };
    UserService.prototype.updateProfile = function (user) {
        var url = "api/users/UpdateProfile";
        return this.httpService.httpPost(user, url);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
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
var AlertService = (function () {
    function AlertService() {
        this.alerts = [];
        this.messageBox = "";
    }
    AlertService.prototype.setValidationErrors = function (scope, validationErrors) {
        for (var prop in validationErrors) {
            var property = prop + "InputError";
            scope[property] = true;
        }
    };
    AlertService.prototype.returnFormattedMessage = function () {
        return this.messageBox;
    };
    AlertService.prototype.returnAlerts = function () {
        return this.alerts;
    };
    AlertService.prototype.renderErrorMessage = function (message) {
        var messageBox = this.formatMessage(message);
        this.alerts = [];
        this.messageBox = messageBox;
        this.alerts.push({ msg: messageBox, type: 'danger', closable: true });
    };
    ;
    AlertService.prototype.renderSuccessMessage = function (message) {
        var messageBox = this.formatMessage(message);
        this.alerts = [];
        this.messageBox = messageBox;
        this.alerts.push({ msg: messageBox, type: 'success', closable: true });
    };
    ;
    AlertService.prototype.renderWarningMessage = function (message) {
        var messageBox = this.formatMessage(message);
        this.alerts = [];
        this.messageBox = messageBox;
        this.alerts.push({ msg: messageBox, type: 'warning', closable: true });
    };
    ;
    AlertService.prototype.renderInformationalMessage = function (message) {
        var messageBox = this.formatMessage(message);
        this.alerts = [];
        this.messageBox = messageBox;
        this.alerts.push({ msg: messageBox, type: 'info', closable: true });
    };
    ;
    AlertService.prototype.formatMessage = function (message) {
        var messageBox = "";
        if (Array.isArray(message) == true) {
            for (var i = 0; i < message.length; i++) {
                messageBox = messageBox + message[i] + "<br/>";
            }
        }
        else {
            messageBox = message;
        }
        return messageBox;
    };
    return AlertService;
}());
AlertService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AlertService);
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map
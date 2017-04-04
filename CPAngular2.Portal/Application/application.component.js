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
require("rxjs/Rx");
var AppComponent = (function () {
    function AppComponent(elementRef) {
        this.elementRef = elementRef;
        var native = this.elementRef.nativeElement;
        this.title = native.getAttribute("title");
        this.currentRoute = native.getAttribute("currentRoute");
        this.version = native.getAttribute("version");
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'codeproject-application',
        template: '<master [currentRoute]="currentRoute" [title]="title" [version]="version"></master>',
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=application.component.js.map
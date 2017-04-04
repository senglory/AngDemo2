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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngx_uploader_1 = require("ngx-uploader");
var NgUploaderComponent = (function () {
    function NgUploaderComponent(zone) {
        this.zone = zone;
        this.sizeLimit = 4000000; // 4MB
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
            previewUrl: true,
            withCredentials: false
        });
        this.inputUploadEvents = new core_1.EventEmitter();
    }
    NgUploaderComponent.prototype.startUpload = function () {
        this.inputUploadEvents.emit('startUpload');
    };
    NgUploaderComponent.prototype.beforeUpload = function (uploadingFile) {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.errorMessage = 'File is too large!';
        }
    };
    NgUploaderComponent.prototype.handleUpload = function (data) {
        var _this = this;
        setTimeout(function () {
            _this.zone.run(function () {
                _this.response = data;
                if (data && data.response) {
                    _this.response = JSON.parse(data.response);
                }
            });
        });
    };
    NgUploaderComponent.prototype.handlePreviewData = function (data) {
        this.previewData = data;
    };
    return NgUploaderComponent;
}());
NgUploaderComponent = __decorate([
    core_1.Component({
        selector: 'ngx-uploader',
        templateUrl: 'application/customer/ngx-uploader.component.html'
    }),
    __param(0, core_1.Inject(core_1.NgZone)),
    __metadata("design:paramtypes", [core_1.NgZone])
], NgUploaderComponent);
exports.NgUploaderComponent = NgUploaderComponent;
//# sourceMappingURL=ngx-uploader.component.js.map
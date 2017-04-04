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
var OutOfGermany = (function () {
    function OutOfGermany(elementRef) {
        this.elementRef = elementRef;
    }
    OutOfGermany.prototype.ngOnInit = function () {
        var max_fields = 10; //maximum input boxes allowed
        var wrapper = jQuery(this.elementRef.nativeElement); //Fields wrapper
        var add_button = jQuery(".add_field_button", wrapper); //Add button ID
        var x = 1; //initlal text box count
        jQuery(add_button).click(function (e) {
            e.preventDefault();
            if (x < max_fields) {
                x++; //text box increment
                var v = jQuery(".container", wrapper);
                v.append('<div class="row"><div class="control-group"><div  class="controls form-group col-md-4"><input type="text" class="input form-control" placeholder="Country" name="countryOOG[]"/></div><div  class="controls form-group col-md-4"><input type="text" class="input form-control" placeholder="City or Zip" name="cityOrZipOOG[]"/></div><div  class="controls form-group col-md-3"><input type="text" class="input form-control" placeholder="Vicinity" name="vicinityOOG[]"/></div><div  class="controls form-group col-md-1"><a href="#" class="remove_field">Remove</a></div></div></div>');
            }
        });
        jQuery(wrapper).on("click", ".remove_field", function (e) {
            e.preventDefault();
            jQuery(this).parent('div').parent('div').parent('div').remove();
            x--;
        });
        jQuery(add_button).trigger("click");
    };
    return OutOfGermany;
}());
OutOfGermany = __decorate([
    core_1.Component({
        selector: 'out-of-germany',
        templateUrl: 'application/customer/out-of-germany.html'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], OutOfGermany);
exports.OutOfGermany = OutOfGermany;
//# sourceMappingURL=out-of-germany.js.map
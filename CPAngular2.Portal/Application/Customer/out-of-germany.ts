import {Component, ElementRef, OnInit} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'out-of-germany',
    templateUrl: 'application/customer/out-of-germany.html'
})

export class OutOfGermany implements OnInit {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        var max_fields = 10; //maximum input boxes allowed
        var wrapper = jQuery(this.elementRef.nativeElement); //Fields wrapper
        var add_button = jQuery(".add_field_button", wrapper); //Add button ID

        var x = 1; //initlal text box count
        jQuery(add_button).click(function (e) { //on add input button click
            e.preventDefault();
            if (x < max_fields) { //max input box allowed
                x++; //text box increment
                var v = jQuery(".container", wrapper);
                v.append('<div class="row"><div class="control-group"><div  class="controls form-group col-md-4"><input type="text" class="input form-control" placeholder="Country" name="countryOOG[]"/></div><div  class="controls form-group col-md-4"><input type="text" class="input form-control" placeholder="City or Zip" name="cityOrZipOOG[]"/></div><div  class="controls form-group col-md-3"><input type="text" class="input form-control" placeholder="Vicinity" name="vicinityOOG[]"/></div><div  class="controls form-group col-md-1"><a href="#" class="remove_field">Remove</a></div></div></div>');
            }
        });

        jQuery(wrapper).on("click",
            ".remove_field",
            function (e) { //user click on remove text
                e.preventDefault();
                jQuery(this).parent('div').parent('div').parent('div').remove();
                x--;
            });
        jQuery(add_button).trigger("click");
    }
}
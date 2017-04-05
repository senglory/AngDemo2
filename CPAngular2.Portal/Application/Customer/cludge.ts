﻿import {Component, ElementRef, OnInit} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'cludge-selector',
    templateUrl: 'application/customer/cludge.html'
})

export class InGermany implements OnInit {
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
                v.append('<div class="row"><div class="control-group"><div  class="controls form-group col-md-7"><input type="text" class="input form-control" placeholder="City or ZIP" name="cityOrZip[]"/></div><div  class="controls form-group col-md-3"><input type="text" class="input form-control" placeholder="Vicinity" name="vicinity[]"/></div><div  class="controls form-group col-md-2"><a href="#" class="remove_field"><i class="fa fa-remove"></i></a></div></div></div>');
            }
        });

        jQuery(wrapper).on("click",
            ".remove_field",
            function(e) { //user click on remove text
                e.preventDefault();
                jQuery(this).parent('div').parent('div').parent('div').remove();
                x--;
            });
        jQuery(add_button).trigger("click");
    }
}
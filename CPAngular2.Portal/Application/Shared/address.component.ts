import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../entities/address.entity'

export var debugVersion = "?version=" + Date.now();

@Component({
    selector: 'address-form',
    templateUrl: 'application/shared/address.component.html' + debugVersion
})

export class AddressComponent implements OnInit {

    @Input() public address: Address;

    constructor() { }

    public ngOnInit() {

    }

 

}
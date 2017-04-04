import { Component } from '@angular/core';

export var debugVersion = "?version=" + Date.now();

@Component({
    templateUrl: 'application/home/contact.component.html' + debugVersion
})

export class ContactComponent {
    title: string = 'Contact';
}
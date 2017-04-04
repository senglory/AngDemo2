import { Component } from '@angular/core';

export var debugVersion = "?version=" + Date.now();

@Component({
    templateUrl: 'application/home/home.component.html' + debugVersion
})

export class HomeComponent {
    title: string = 'Home';
}

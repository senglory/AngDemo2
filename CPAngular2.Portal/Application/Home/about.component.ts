import { Component, OnInit } from '@angular/core';

export var debugVersion = "?version=" + Date.now();

@Component({
   templateUrl: 'application/home/about.component.html' + debugVersion  
   // template: `<h4 class="page-header">{{title}}</h4>
   // <h2>mark was here</h2>`
})

export class AboutComponent implements OnInit {

    public title: string = 'About';   

    constructor() { }

    public ngOnInit() {}

}
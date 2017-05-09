import { Component, OnInit, Input } from '@angular/core';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { Alert } from '../entities/alert.entity'


export var debugVersion = "?version=" + Date.now();

@Component({
    selector: 'alertbox',
    templateUrl: 'application/shared/alertbox.component.html' + debugVersion,
})

export class AlertBoxComponent implements OnInit {
  
    @Input() public alerts: Alert[];
    @Input() public messageBox: string;

    constructor() { }

    public ngOnInit() {
      
    }

    public closeAlert(i: number): void {
        this.alerts.splice(i, 1);
    }


}
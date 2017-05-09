import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { AlertBoxComponent } from '../shared/alertbox.component';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../entities/customer.entity';
import { Alert } from '../entities/alert.entity';

export var debugVersion = "?version=" + Date.now();

@Component({
    templateUrl: 'application/home/import-customers.component.html' + debugVersion,
    providers: [CustomerService, AlertService],
})

export class ImportCustomersComponent implements OnInit {

    public title: string = 'Import Customers';

    public alerts: Array<Alert> = [];
    public messageBox: string;

    constructor(private customerService: CustomerService, private alertService: AlertService) { }

    public ngOnInit() {}

    public importCustomers(): void {

        let customer = new Customer();
        this.customerService.importCustomers(customer)
            .subscribe(
            response => this.importCustomersOnSuccess(response),
            response => this.importCustomersOnError(response));
    }


    private importCustomersOnSuccess(response): void {
        this.alertService.renderSuccessMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    }

    private importCustomersOnError(response): void {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    }


}
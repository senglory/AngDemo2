import { Component, OnInit, NgZone, Inject, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../entities/address.entity';
import { Customer } from '../entities/customer.entity';
import { AlertBoxComponent } from '../shared/alertbox.component';
import { CustomerService } from '../services/customer.service';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { SessionService } from '../services/session.service';
import { AddressComponent } from '../shared/address.component';
import { InGermany }  from './cludge';
import { OutOfGermany }  from './out-of-germany';
import { DienstSelector }  from './dienst-selector';
import { NgUploaderOptions, UploadedFile, UploadRejected } from 'ngx-uploader';

//import { ImageUploadModule } from 'ng2-imageupload';
//import { NgUploaderModule } from 'ngx-uploader';
//import { NgModule }      from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { AppComponent }  from './app.component';

export var debugVersion = "?version=" + Date.now();

@Component({
    templateUrl: 'application/customer/customer-maintenance.component.html' + debugVersion,
    providers: [AlertService],
})

export class CustomerMaintenanceComponent implements OnInit {

    public title: string = 'Provider Maintenance';
    public customerID: number;
    public salutation: string; 
    public Abteilung: string;
    public customerCode: string;
    public companyVorname: string;
    public companyName: string;
    public phoneNumber: string;
    public phoneNumber2: string;
    public address: Address;
    public fax: string;
    public eMail: string;
    public photo: any;

    public showUpdateButton: Boolean;
    public showAddButton: Boolean;

    public salutationInputError: Boolean;
    public customerCodeInputError: Boolean;
    public companyNameInputError: Boolean;

    public messageBox: string;
    public schedule: Array<Date> = [];
    public alerts: Array<string> = [];



    options: NgUploaderOptions;
    response: any;
    sizeLimit: number = 1000000; // 1MB
    previewData: any;
    errorMessage: string;
    inputUploadEvents: EventEmitter<string>;

    constructor(
         //private zone: NgZone,

        private route: ActivatedRoute,
        private customerService: CustomerService,
        private sessionService: SessionService,
        private alertService: AlertService) {
        this.options = new NgUploaderOptions({
            url: 'http://api.ngx-uploader.com/upload',
            filterExtensions: true,
            allowedExtensions: ['jpg', 'png'],
            data: { userId: 12 },
            autoUpload: false,
            fieldName: 'file',
            fieldReset: true,
            maxUploads: 2,
            method: 'POST',
            previewUrl: false,
            withCredentials: false
        });

        this.inputUploadEvents = new EventEmitter<string>();
    }

    startUpload() {
        this.inputUploadEvents.emit('startUpload');
    }

    beforeUpload(uploadingFile: UploadedFile): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.errorMessage = 'File is too large!';
        }
    }

    handleUpload(data: any) {
        setTimeout(() => {
            //this.zone.run(() => {
            //    this.response = data;
            //    if (data && data.response) {
            //        this.response = JSON.parse(data.response);
            //    }
            //});
        });
    }

    handlePreviewData(data: any) {
        this.previewData = data;
    }

    public ngOnInit() {

        this.showUpdateButton = false;
        this.showAddButton = false;

        this.address = new Address();

        this.route.params.subscribe(params => {

            let id: string = params['id'];

            if (id != undefined) {

                this.customerID = parseInt(id);

                let customer = new Customer();
                customer.customerID = this.customerID;

                this.customerService.getCustomer(customer)
                    .subscribe(
                    response => this.getCustomerOnSuccess(response),
                    response => this.getCustomerOnError(response));


            }
            else {
                this.customerID = 0;
                this.showAddButton = true;
                this.showUpdateButton = false;
            }

        });


    }

    private getCustomerOnSuccess(response: Customer) {
        this.customerCode = response.customerCode;
        this.companyVorname = response.companyVorname;
        this.companyName = response.companyName;
        this.phoneNumber = response.phoneNumber;
        this.eMail = response.eMail;
        this.address.addressLine1 = response.addressLine1;
        this.address.addressLine2 = response.addressLine2;
        this.address.city = response.city;
        this.address.state = response.state;
        this.address.zipCode = response.zipCode;
        this.showUpdateButton = true;
        this.showAddButton = false;
    }

    private getCustomerOnError(response: Customer) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);    
    }

    public updateCustomer(): void {

        let customer = new Customer();

        customer.customerID = this.customerID;
        customer.Abteilung = this.Abteilung;
        customer.salutation = this.salutation;
        customer.customerCode = this.customerCode;
        customer.companyVorname = this.companyVorname;
        customer.companyName = this.companyName;
        customer.phoneNumber = this.phoneNumber;
        customer.phoneNumber2 = this.phoneNumber2;
        customer.eMail = this.eMail;
        customer.addressLine1 = this.address.addressLine1;
        customer.addressLine2 = this.address.addressLine2;
        customer.city = this.address.city;
        customer.state = this.address.state;
        customer.zipCode = this.address.zipCode;
        customer.photo = this.photo;

        this.clearInputErrors();
   
        this.customerService.updateCustomer(customer)
            .subscribe(
            response => this.updateCustomerOnSuccess(response),
            response => this.updateCustomerOnError(response));
    }

    private updateCustomerOnSuccess(response: Customer) {

        if (this.customerID == 0) {
            this.customerID = response.customerID;
            this.showAddButton = false;
            this.showUpdateButton = true;
        }
       
        this.alertService.renderSuccessMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    }

    private updateCustomerOnError(response: Customer) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);    
    }


    private clearInputErrors() {
        this.customerCodeInputError = false;
        this.companyNameInputError = false;
        this.salutationInputError = false;
    }


}
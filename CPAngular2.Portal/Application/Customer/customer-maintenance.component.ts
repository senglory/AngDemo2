import { Component, OnInit, NgZone, ChangeDetectorRef, Inject, EventEmitter } from '@angular/core';
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
    public photo: string;

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

    path = '';
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];  

    constructor(
        private zone: NgZone,
        private changeDetectorRef: ChangeDetectorRef,

        private route: ActivatedRoute,
        private customerService: CustomerService,
        private sessionService: SessionService,
        private alertService: AlertService) {

    }


    fileChange(inp) {
        this.readFiles(inp.files);
    }

    readFile(file, reader, callback) {
        reader.onload = () => {
            callback(reader.result);
            this.photo = reader.result;
            console.log(reader.result);
        }
        reader.readAsDataURL(file);
    }
    readFiles(files, index = 0) {
        // Create the file reader  
        let reader = new FileReader();
        // If there is a file  
        if (index in files) {
            // Start reading this file  
            this.readFile(files[index], reader, (result) => {

                // Create an img element and add the image file data to it  
                var img = document.createElement("img");
                img.setAttribute('id' , "dummy");
                img.src = result;
                // Send this img to the resize function (and wait for callback)  
                this.resize(img, 250, 250, (resized_pict, before, after) => {
                    // For debugging (size in bytes before and after)  
                    this.debug_size_before.push(before);
                    this.debug_size_after.push(after);
                    // Add the resized jpeg img source to a list for preview  
                    // This is also the file you want to upload. (either as a  
                    // base64 string or img.src = resized_jpeg if you prefer a file).  
                    this.file_srcs.pop();
                    this.file_srcs.push(resized_pict);
                    // Read the next file;  
                    //this.readFiles(files, index + 1);
                });
            });
        } else {
            // When all files are done This forces a change detection  
            this.changeDetectorRef.detectChanges();
        }
    }
    resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
        // This will wait until the img is loaded before calling this function  
        return img.onload = () => {
            // Get the images current width and height  
            var width = img.width;
            var height = img.height;
            // Set the WxH to fit the Max values (but maintain proportions)  
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            // create a canvas object  
            var canvas = document.createElement("canvas");
            // Set the canvas to the new calculated dimensions  
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            // Get this encoded as a jpeg  
            // IMPORTANT: 'jpeg' NOT 'jpg'  
            var dataUrl = canvas.toDataURL('image/jpeg');
            // callback with the results  
            callback(dataUrl, img.src.length, dataUrl.length);
        };
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
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataGridColumn, DataGridButton, DataGridEventInformation } from '../shared/datagrid/datagrid.core';
import { DataGrid } from '../shared/datagrid/datagrid.component';
import { AlertService } from '../services/alert.service';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../entities/customer.entity';
import { CustomersList } from '../entities/customersList.entity';
import { TransactionalInformation } from '../entities/transactionalinformation.entity';
import { Alert } from '../entities/alert.entity';

export var debugVersion = "?version=" + Date.now();

@Component({
    templateUrl: 'application/customer/customer-inquiry.component.html' + debugVersion,
    providers: [AlertService]
})

export class CustomerInquiryComponent implements OnInit {

    @ViewChild(DataGrid) datagrid: DataGrid;

    public title: string = 'Provider Inquiry';
    public customers: Customer[];
    public columns = [];

    public alerts: Array<Alert> = [];
    public messageBox: string;

    public totalRows: number;
    public currentPageNumber: number = 1;
    public totalPages: number;
    public pageSize: number;
    public companyName: string;
    public customerCode: string;
    private sortDirection: string;
    private sortExpression: string;

    public autoFilter: Boolean;
    public delaySearch: Boolean;
    public runningSearch: Boolean;

    constructor(private alertService: AlertService, private customerService: CustomerService, private router: Router) {

        this.currentPageNumber = 1;
        this.autoFilter = false;
        this.totalPages = 0;
        this.totalRows = 0;
        this.pageSize = 15;
        this.sortDirection = "ASC";
        this.sortExpression = "CompanyName";

    }

    public ngOnInit() {

        this.columns.push(new DataGridColumn('Abteilung', 'Funktion / Abteilung', '[{"width": "20%" , "disableSorting": false}]'));
        this.columns.push(new DataGridColumn('companyVorname', 'Vorname', '[{"width": "20%" , "hyperLink": true, "disableSorting": false}]'));
        this.columns.push(new DataGridColumn('companyName', 'Nachname', '[{"width": "30%" , "hyperLink": true, "disableSorting": false}]'));
        this.columns.push(new DataGridColumn('city', 'City', '[{"width": "20%" , "disableSorting": false}]'));
        this.columns.push(new DataGridColumn('zipCode', 'Zip Code', '[{"width": "10%" , "disableSorting": false}]'));

        this.executeSearch();

    }

    private executeSearch(): void {

        if (this.runningSearch == true) return;

        let miliseconds = 500;

        if (this.delaySearch == false) {
            miliseconds = 0;
        }

        this.runningSearch = true;

        setTimeout(() => {

                let cust = new Customer();
                cust.customerCode = this.customerCode;
                cust.companyName = this.companyName;
                cust.pageSize = this.pageSize;
                cust.sortDirection = this.sortDirection;
                cust.sortExpression = this.sortExpression;
                cust.currentPageNumber = this.currentPageNumber;

                this.customerService.getCustomers(cust)
                    .subscribe(
                        response => this.getCustomersOnSuccess(response),
                        response => this.getCustomersOnError(response));

            },
            miliseconds);

    }


    private getCustomersOnSuccess(cust: CustomersList): void {

        let ti = new TransactionalInformation();
        ti.currentPageNumber = this.currentPageNumber;
        ti.pageSize = this.pageSize;
        ti.totalPages = cust.totalPages;
        ti.totalRows = cust.totalRows;
        ti.sortDirection = this.sortDirection;
        ti.sortExpression = this.sortExpression;

        this.customers = cust.customers;

        this.datagrid.databind(ti);

        this.alertService.renderSuccessMessage(cust.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();

        this.runningSearch = false;

    }

    private getCustomersOnError(response): void {

        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();

        this.runningSearch = false;

    }

    public datagridEvent(event) {
        let datagridEvent: DataGridEventInformation = event.value;

        if (datagridEvent.EventType == "PagingEvent") {
            this.pagingCustomers(datagridEvent.CurrentPageNumber);
        }

        else if (datagridEvent.EventType == "PageSizeChanged") {
            this.pageSizeChanged(datagridEvent.PageSize);
        }

        else if (datagridEvent.EventType == "ItemSelected") {
            this.selectedCustomer(datagridEvent.ItemSelected);
        }

        else if (datagridEvent.EventType == "Sorting") {
            this.sortCustomers(datagridEvent.SortDirection, datagridEvent.SortExpression);
        }

    }


    private selectedCustomer(itemSelected: number) {

        let rowSelected = itemSelected;
        let row = this.customers[rowSelected];
        let customerID = row.customerID;

        this.router.navigate(['/customer/customermaintenance', { id: customerID }]);

    }

    private sortCustomers(sortDirection: string, sortExpression: string) {
        this.sortDirection = sortDirection;
        this.sortExpression = sortExpression;
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    }

    private pagingCustomers(currentPageNumber: number) {
        this.currentPageNumber = currentPageNumber;
        this.delaySearch = false;
        this.executeSearch();
    }

    private pageSizeChanged(pageSize: number) {
        this.pageSize = pageSize;
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    }

    public reset(): void {
        this.customerCode = "";
        this.companyName = "";
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    }

    public search(): void {
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    }

    public companyNameChanged(newValue): void {

        if (this.autoFilter == false) return;
        if (newValue == "") return;

        this.companyName = newValue;
        this.currentPageNumber = 1;
        this.delaySearch = true;

        setTimeout(() => {
                this.executeSearch();
            },
            500);

    }

    public customerCodeChanged(newValue): void {

        if (this.autoFilter == false) return;
        if (newValue == "") return;

        this.customerCode = newValue;
        this.currentPageNumber = 1;
        this.delaySearch = true;

        setTimeout(() => {
                this.executeSearch();
            },
            500);

    }


}
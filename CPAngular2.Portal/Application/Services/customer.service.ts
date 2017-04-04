import { Customer } from '../entities/customer.entity';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HttpService } from './http.service';


@Injectable()
export class CustomerService {

    constructor(private httpService: HttpService) { }

    public importCustomers(customer: Customer): Observable<any> {

        let url = "api/customers/importcustomers";
        return this.httpService.httpPost(customer, url);

    }

    public getCustomers(customer: Customer): Observable<any> {

        let url = "api/customers/getcustomers";
        return this.httpService.httpPost(customer, url);

    }
   
    public getCustomer(customer: Customer): Observable<any> {

        let url = "api/customers/getcustomer";
        return this.httpService.httpPost(customer, url);

    }

    public updateCustomer(customer: Customer): Observable<any> {

        let url = "api/customers/updatecustomer";
        return this.httpService.httpPost(customer, url);

    }


}
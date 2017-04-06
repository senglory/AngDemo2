﻿import { TransactionalInformation } from './transactionalinformation.entity';
import { Geography } from './geography.entity';
import {Availability} from './availability.entity';

export class Customer extends TransactionalInformation {
    public customerID: number;
    public salutation: string; 
    public Abteilung: string;
    public companyVorname: string;
    public companyName: string;
    public customerCode: string;
    public addressLine1: string;
    public addressLine2: string;
    public city: string;
    public state: string;
    public zipCode: string;
    public phoneNumber: string;
    public phoneNumber2: string;
    public faxNumber: string;
    public eMail: string;
    public photo: string;
    public dateCreated: Date;
    public dateUpdated: Date;
    public availableAllDE: boolean;
    public availableGeo: Array<Geography>;
    public availableTime: Array<Availability>;
    public customers: Array<Customer>;
}

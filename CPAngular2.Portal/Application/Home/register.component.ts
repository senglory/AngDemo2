import { Component, OnInit, ViewChild, ContentChild, AfterViewInit } from '@angular/core';
import { User } from '../entities/user.entity';

import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';
import { SessionService } from '../services/session.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { AlertBoxComponent } from '../shared/alertbox.component';

export var debugVersion = "?version=" + Date.now();

@Component({
    templateUrl: 'application/home/register.component.html' + debugVersion,
    providers: [UserService, HttpService, AlertService],
})

export class RegisterComponent implements OnInit {

    public title: string = 'Register';
    public fullName: string = "";
    public firstName: string = "";
    public lastName: string = "";
    public emailAddress: string = "";
    public password: string = "";
    public passwordConfirmation: string = "";
    public alerts: Array<string> = [];
    public messageBox: string;

    public firstNameInputError: Boolean;
    public lastNameInputError: Boolean;
    public emailAddressInputError: Boolean;
    public passwordInputError: Boolean;
    public passwordConfirmationInputError: Boolean;
    
    constructor(private userService: UserService, private sessionService: SessionService, private alertService: AlertService, private router: Router) { }

    public ngOnInit() {
        this.clearInputErrors();     
    }
             
    public registerUser($event): void {
  
        let user: User = new User();
        user.emailAddress = this.emailAddress;
        user.firstName = this.firstName;
        user.lastName = this.lastName;
        user.password = this.password;
        user.passwordConfirmation = this.passwordConfirmation;

        this.clearInputErrors();

        this.userService.registerUser(user)
            .subscribe(
            response => this.registerUserOnSuccess(response),
            response => this.registerUserOnError(response));
      
    }

    private clearInputErrors() {
        this.firstNameInputError = false;
        this.lastNameInputError = false;
        this.emailAddressInputError = false;
        this.passwordInputError = false;
        this.passwordConfirmationInputError = false;
    }

    private registerUserOnSuccess(response): void {
        
        let user: User = new User();
        user.userID = response.userID;
        user.emailAddress = response.emailAddress;
        user.firstName = response.firstName;
        user.lastName = response.lastName;
       
        this.sessionService.authenicated(user);

        this.router.navigate(['/home/home']);
      
    }

    private registerUserOnError(response): void {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);                
    }
}
    
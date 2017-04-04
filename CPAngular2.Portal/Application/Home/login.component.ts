import { Component } from '@angular/core';
import { User } from '../entities/user.entity';

import { AlertBoxComponent } from '../shared/alertbox.component';
import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

export var debugVersion = "?version=" + Date.now();

@Component({
    templateUrl: 'application/home/login.component.html' + debugVersion,
    providers: [UserService, HttpService, AlertService],
})

export class LoginComponent {

    public title: string = 'Login';      
    public emailAddress: string = "";
    public password: string = "";
    public messageBox: string;
    public alerts: Array<string> = [];

    constructor(private userService: UserService, private sessionService: SessionService, private alertService: AlertService, private router: Router) { }  

    public login($event) {

        let user: User = new User();
        user.emailAddress = this.emailAddress;
        user.password = this.password;
    
        this.userService.login(user)
            .subscribe(
            response => this.loginOnSuccess(response),
            response => this.loginOnError(response));

    }

    private loginOnSuccess(response: User) {
     
        this.sessionService.authenicated(response);

        this.router.navigate(['/home/home']);

    }

    private loginOnError(response: User) {      
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    }
}
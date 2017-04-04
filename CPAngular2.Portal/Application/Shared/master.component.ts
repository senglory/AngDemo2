import { Component, EventEmitter, OnInit, Input, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CustomerService } from '../services/customer.service';
import { HttpService } from '../services/http.service';
import { BlockUIService } from '../services/blockui.service';

export var debugVersion = "?version=" + Date.now();

@Component({
    selector: 'master',
    templateUrl: 'application/shared/master.component.html' + debugVersion,
    providers: [UserService, CustomerService, HttpService, BlockUIService]
})

export class MasterComponent implements OnInit {
   
    public firstName: string;
    public lastName: string;
    public isAuthenicated: Boolean = false;    
    public endDateTime: string;

    public blockUI: Boolean;

    @Input() public currentRoute: string;
    @Input() public title: string;
    @Input() public version: string;

    constructor(private sessionService: SessionService,
        private applicationRef: ApplicationRef,
        private userService: UserService,
        private blockUIService: BlockUIService,
        private router: Router) {

        router.events.subscribe((uri) => {                 
           // applicationRef.zone.run(() => applicationRef.tick());          /// bug fix when hitting the back button in Internet Explorer  
        });

    }

    public ngOnInit() {
                                
        this.sessionService.version = this.version;

        this.sessionService.sessionEvent.subscribe(user => this.onAuthenication(user));        
        this.blockUIService.blockUIEvent.subscribe(event => this.blockUnBlockUI(event));

        this.blockUIService.blockUIEvent.emit({
            value: true
        });

        let user: User = new User();

        this.userService.authenicate(user)
            .subscribe(
            response => this.authenicateOnSuccess(response),
            response => this.authenicateOnError(response));

    }

    private blockUnBlockUI(event) {
        this.blockUI = event.value;
    }

    private authenicateOnSuccess(response: User) {

        this.blockUIService.blockUIEvent.emit({
            value: false
        });
       
        if (response.returnStatus == false) {        
            return;
        }

        let user: User = new User();
        user.emailAddress = response.emailAddress;
        user.firstName = response.firstName;
        user.lastName = response.lastName;
        user.addressLine1 = response.addressLine1;
        user.addressLine2 = response.addressLine2;
        user.city = response.city;
        user.state = response.state;
        user.zipCode = response.zipCode;
       
        this.sessionService.authenicated(user);
            
        if (this.currentRoute == "/") {
            this.router.navigate(['/home/home']);
            return;
        }
        else {           
            this.router.navigate([this.currentRoute]);
        }    
       
    }

    private authenicateOnError(response) {
        this.isAuthenicated = false;
        this.blockUIService.blockUIEvent.emit({
            value: false
        });
    }

    private onAuthenication(user: User): void {     

        this.firstName = user.firstName;
        this.lastName = user.lastName;       
        this.isAuthenicated = true;
     
    }

    public logout() {

        this.firstName = "";
        this.lastName = "";
        this.isAuthenicated = false;        
        this.sessionService.logout(); 

        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("CodeProjectAngular2Token", "");
        }
     
        this.router.navigate(['/home/home']);

    }



}

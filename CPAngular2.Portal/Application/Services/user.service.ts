import { User } from '../entities/user.entity';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HttpService } from './http.service';


@Injectable()
export class UserService {

    constructor(private httpService: HttpService) { }    

    public registerUser(user: User): Observable<any> {

        let url = "api/users/registerUser";     
        return this.httpService.httpPost(user, url);
                   
    }

    public login(user: User): Observable<any> {

        let url = "api/users/login";
        return this.httpService.httpPost(user, url);

    }

    public authenicate(user: User): Observable<any> {
    
        let url = "api/users/Authenicate";
        return this.httpService.httpPostWithNoBlock(user, url);

    }

    public updateProfile(user: User): Observable<any> {

        let url = "api/users/UpdateProfile";
        return this.httpService.httpPost(user, url);

    }


}
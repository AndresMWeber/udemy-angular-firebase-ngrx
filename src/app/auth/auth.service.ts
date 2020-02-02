import { uuidv4 } from 'uuid/v4';

import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();

    private user: User;

    constructor(private router: Router) {}

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: uuidv4(),
        };
        this.authSuccessRedirect();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: uuidv4(),
        };
        this.authSuccessRedirect();
    }

    private authSuccessRedirect() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
    
    logout() {
        this.user = undefined;
        this.authChange.next(false);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        console.log(this.user)
        return this.user != null && this.user != undefined;
    }
}

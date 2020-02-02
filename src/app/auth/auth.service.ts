const uuidv4 = require('uuid/v4');

import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';

export class AuthService {
    authChange = new Subject<boolean>();

    private user: User;
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: uuidv4(),
        };
        this.authChange.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: uuidv4(),
        };
        this.authChange.next(true);
    }

    logout() {
        this.user = undefined;
        this.authChange.next(false);
    }
}

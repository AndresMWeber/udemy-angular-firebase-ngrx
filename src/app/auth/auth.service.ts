import { Subject } from 'rxjs'
import { AuthData } from './auth-data.model'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from '../training/training.service'
import * as firebase from 'firebase/app'

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>()

    private isAuthenticated = false

    constructor(private router: Router, private fireAuth: AngularFireAuth, private trainingService: TrainingService) {}

    initAuthListener() {
        this.fireAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true
                this.authChange.next(true)
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscriptions()
                this.isAuthenticated = false
                this.authChange.next(false)
                this.router.navigate(['/login'])
            }
        })
    }

    signInWithGoogle() {
        return this.fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }

    isAuth() {
        return this.isAuthenticated
    }

    registerUser(authData: AuthData) {
        this.fireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).catch(err => {
            console.log(err)
        })
    }

    login(authData: AuthData) {
        this.fireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).catch(err => {
            console.log(err)
        })
    }

    logout() {
        this.fireAuth.auth.signOut()
    }
}

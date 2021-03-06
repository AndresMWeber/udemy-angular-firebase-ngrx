import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', {
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', {
                validators: [Validators.required]
            })
        })
        console.log(this.loginForm)
    }

    signInWithGoogle() {
        this.authService.signInWithGoogle()
    }

    onSubmit() {
        console.log('here', this.loginForm)
        this.authService.login({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        })
    }
}

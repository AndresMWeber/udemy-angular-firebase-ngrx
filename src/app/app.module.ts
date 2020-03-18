import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { SignupComponent } from './auth/signup/signup.component'
import { LoginComponent } from './auth/login/login.component'
import { TrainingComponent } from './training/training.component'
import { CurrentTrainingComponent } from './training/current-training/current-training.component'
import { NewTrainingComponent } from './training/new-training/new-training.component'
import { PastTrainingComponent } from './training/past-training/past-training.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDatepickerModule, MatIconModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HeaderComponent } from './navigation/header/header.component'
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component'
import { StopTrainingComponent } from './training/current-training/stop-training.component'
import { AuthService } from './auth/auth.service'
import { TrainingService } from './training/training.service'

import { environment } from '../environments/environment'

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        WelcomeComponent,
        HeaderComponent,
        SidenavListComponent,
        StopTrainingComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatDatepickerModule,
        MaterialModule,
        FlexLayoutModule,
        MatIconModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    providers: [AuthService, TrainingService],
    bootstrap: [AppComponent],
    entryComponents: [StopTrainingComponent]
})
export class AppModule {}

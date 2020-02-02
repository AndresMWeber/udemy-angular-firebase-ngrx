import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() sidenavToggle = new EventEmitter<void>();
    isAuth = false;
    authSubscription: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authSubscription = this.authService.authChange.subscribe(
            authStatus => {
                this.isAuth = authStatus;
            }
        );
    }
    
    ngOnDestroy() {
        this.authSubscription.unsubscribe;
    }
    
    onToggleSidenav() {
        this.sidenavToggle.emit();
    }

    onLogout(){
        this.authService.logout()
    }
}

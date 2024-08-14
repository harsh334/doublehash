import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
    showNavbar: boolean = false;
    constructor(
        private sharedService: SharedService,
        private authService: AuthService
    ) {}
    ngOnInit() {
        this.showNavbarIfUserLoggedIn();
        this.sharedService.changeInUserLogin$.subscribe(() => {
            this.showNavbarIfUserLoggedIn();
        });
    }
    showNavbarIfUserLoggedIn() {
        if (localStorage.getItem('user') !== null) {
            this.showNavbar = true;
        } else {
            this.showNavbar = false;
        }
    }
}

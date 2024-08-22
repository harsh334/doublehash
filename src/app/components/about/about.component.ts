import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
})
export class AboutComponent {
    constructor(
        private authService: AuthService,
        private toasterService: ToasterService,
        private route: Router
    ) {}

    redirectToLogin() {
        if (this.authService.isUserAuthenticated() !== null) {
            this.toasterService.showSuccess(Constants.alreadyLoggedIn);
            this.route.navigateByUrl('/posts');
        } else {
            this.route.navigateByUrl('/login');
        }
    }
}

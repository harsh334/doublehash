import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    loginForm!: FormGroup;
    usersList: string[] = [];
    invalidCredentialMessage: string = Constants.invalidCredentialMessage;
    showInvalidCredentialMessage: boolean = false;
    ngOnInit() {
        this.loginForm = new FormGroup({
            userEmail: new FormControl('', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
            ]),
        });
        this.getUsers();
    }
    get userEmail() {
        return this.loginForm.get('userEmail');
    }
    get password() {
        return this.loginForm.get('password');
    }
    constructor(
        private authService: AuthService,
        private sharedService: SharedService,
        private route: Router
    ) {}
    getUsers() {
        let userList: string[] = [];
        this.sharedService.getUsers().subscribe((users: any) => {
            this.usersList = users;
        });
    }
    Login(formDetails: any) {
        let userEmail = formDetails.userEmail;
        let password = formDetails.password;
        this.usersList.forEach((user: any) => {
            if (
                user.userEmail === formDetails.userEmail &&
                user.password === formDetails.password
            ) {
                //subject se isLoginnned ko true krdo
                let isLoggedIn: any = this.authService.login(user);
                if (isLoggedIn) {
                    //show successful toaster
                    this.redirectToProfilePage();
                }
                return;
            } else {
                this.showInvalidCredentialMessage = true;
            }
        });
    }
    redirectToRegistrationPage() {
        this.route.navigateByUrl('/register');
    }
    redirectToProfilePage() {
        this.route.navigateByUrl('/profile');
    }
}

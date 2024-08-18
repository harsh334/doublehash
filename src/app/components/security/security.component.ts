import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html',
    styleUrl: './security.component.css',
})
export class SecurityComponent {
    loggedInUser!: any;
    defaultUserImage: string = Constants.userImage;
    editProfileForm!: FormGroup;
    isEditProfileFormVisible: boolean = false;
    errorMessage!: string;

    constructor(
        private sharedService: SharedService,
        private toasterService: ToasterService,
        private authService: AuthService,
        private route: Router
    ) {}
    ngOnInit() {
        this.toasterService.showWarning(Constants.logoutWarning);
        this.loggedInUser = this.sharedService.getLoggedInUser();
        this.editProfileForm = new FormGroup({
            oldPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
            ]),
        });
    }
    editProfile(userId: string, formData: any) {
        console.log(formData);
        if (formData.oldPassword === this.loggedInUser.password) {
            this.sharedService
                .editProfile(userId, {
                    password: formData.newPassword,
                })
                .subscribe(() => {
                    this.toasterService.showSuccess(
                        Constants.passwordChangeSuccessful
                    );
                    this.authService.logout();
                    this.redirectToLogin();
                });
        } else {
            this.errorMessage = 'You entered Wrong Password';
        }
    }

    get newPassword() {
        return this.editProfileForm.get('newPassword');
    }

    showEditForm() {
        this.isEditProfileFormVisible = true;
    }

    hideEditForm() {
        this.isEditProfileFormVisible = false;
    }
    redirectToLogin() {
        this.route.navigateByUrl('/login');
    }
}

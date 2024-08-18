import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    showImageUploadOption: boolean = false;
    uniqueName!: string;
    selectedImage!: File;
    base64Image!: string;
    registerForm!: FormGroup;
    constructor(
        private registrationService: RegistrationService,
        private toasterService: ToasterService,
        private route: Router
    ) {}
    ngOnInit() {
        this.registerForm = new FormGroup({
            userEmail: new FormControl('', [
                Validators.required,
                Validators.email,
            ]),
            fullName: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]),
            userName: new FormControl(''),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
            ]),
            posts: new FormArray([new FormControl('')]),
            profileImage: new FormControl('', [
                Validators.pattern(/\.(png|jpe?g)$/i),
            ]),
        });
    }
    get userEmail() {
        return this.registerForm.get('userEmail');
    }
    get fullName() {
        return this.registerForm.get('fullName');
    }
    get userName() {
        return this.registerForm.get('userName');
    }
    get password() {
        return this.registerForm.get('password');
    }
    get posts() {
        return this.registerForm.get('posts') as FormArray;
    }
    get profileImage() {
        return this.registerForm.get('profileImage');
    }
    showImageUploadForm() {
        this.showImageUploadOption = !this.showImageUploadOption;
    }

    onEmailEntered(event: any) {
        let userEmail = event.target.value;
        this.uniqueName =
            userEmail.split('@')[0] + Math.floor(Math.random() * 100);
        this.registerForm.get('userName')?.setValue(this.uniqueName);
    }

    onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedImage);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result as string;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const base64Image = canvas.toDataURL('image/jpeg', 0.5);
                this.base64Image = base64Image;
                console.log(this.base64Image);
            };
        };
    }

    submitRegisterForm(formDetails: any) {
        formDetails.profileImage = this.base64Image;
        this.registrationService.register(formDetails).subscribe((result) => {
            if (result) {
                this.toasterService.showSuccess(
                    'You Are Successfully Registered!'
                );
                this.redirectToLoginPage();
            }
        });
    }
    redirectToLoginPage() {
        this.route.navigateByUrl('/login');
    }
}

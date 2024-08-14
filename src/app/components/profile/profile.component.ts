import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
    loggedInUser: any = '';
    posts: any[] = [];
    defaultUserImage: any = Constants.userImage;
    isEditProfileFormVisible = false;
    isPostVisible = false;
    selectedPost!: any;
    editProfileForm!: FormGroup;
    selectedImage!: any;
    base64Image!: any;
    isSpinnerVisible: boolean = true;
    private changeInUserDetailsSubscription!: Subscription;
    constructor(
        private sharedService: SharedService,
        private authService: AuthService,
        private route: Router
    ) {}
    ngOnInit() {
        this.loggedInUser = this.sharedService.getLoggedInUser();
        for (let i = 1; i <= this.loggedInUser.posts.length - 1; i++) {
            this.getPostByPostID(this.loggedInUser.posts[i]);
        }
        this.changeInUserDetailsSubscription =
            this.sharedService.changeInUserDetails$.subscribe(() => {
                this.loggedInUser = this.sharedService.getLoggedInUser();
            });
        this.editProfileForm = new FormGroup({
            profileImage: new FormControl(),
            userEmail: new FormControl(this.loggedInUser.userEmail, [
                Validators.email,
            ]),
            fullName: new FormControl(this.loggedInUser.fullName, [
                Validators.minLength(2),
                Validators.maxLength(30),
            ]),
        });
    }

    getPostByPostID(postID: string): void {
        this.sharedService.getPostByPostID(postID).subscribe(
            (post: any) => {
                this.posts.push(post);
                this.isSpinnerVisible = false;
            },
            (error: any) => {
                console.error('Error retrieving post:', error);
                // Handle error
            },
            () => {
                this.isSpinnerVisible = false;
            }
        );
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
            };
        };
    }

    showEditForm() {
        this.isEditProfileFormVisible = true;
    }

    hideEditForm() {
        this.isEditProfileFormVisible = false;
    }

    editProfile(userId: string, editedFormValues: any) {
        console.log('editedFormValues', editedFormValues);

        if (editedFormValues.profileImage != undefined) {
            editedFormValues.profileImage = this.base64Image;
        } else {
            editedFormValues.profileImage = this.loggedInUser.profileImage;
        }
        this.sharedService
            .editProfile(userId, editedFormValues)
            .subscribe((user) => {
                console.log('after editing', user);

                this.sharedService.updateUserDetailsInLocalStorage(
                    loggedInUser
                );
                this.sharedService.changeInUserDetails$.next();
            });
        const loggedInUser = { ...this.loggedInUser, ...editedFormValues };
        this.hideEditForm();
    }

    showPost(post: any) {
        this.selectedPost = { ...this.loggedInUser, ...post };
        this.isPostVisible = true;
    }
    hidePost() {
        this.isPostVisible = false;
    }
    logout() {
        let isUserLoggedIn = this.authService.logout();
        if (!isUserLoggedIn) {
            this.redirectToLogin();
        }
    }

    redirectToLogin() {
        this.route.navigateByUrl('/login');
    }

    ngOnDestroy() {
        this.changeInUserDetailsSubscription.unsubscribe();
    }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent {
    @Output() closeModal = new EventEmitter<void>();
    selectedImage!: File;
    base64Image!: string;
    postForm!: FormGroup;
    loggedInUser!: any;
    imagePreview: boolean = false;
    constructor(
        private sharedService: SharedService,
        private toasterService: ToasterService
    ) {}
    ngOnInit() {
        this.getLoggedInUser();
        this.postForm = new FormGroup({
            postImage: new FormControl(),
            postDescription: new FormControl(),
        });
    }

    close() {
        this.closeModal.emit();
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
            this.imagePreview = true;
        };
    }

    post(formData: any) {
        let postBody = {
            imageLink: this.base64Image,
            description: formData.postDescription,
            likes: new Array(''),
            userID: this.loggedInUser.key,
            time: new Date().toISOString(),
        };
        this.sharedService.postPosts(postBody).subscribe((post: any) => {
            this.sharedService.addPostInUserDetails(post.name);
            this.loggedInUser.posts.push(post.name);
            this.sharedService.updateUserDetailsInLocalStorage(
                this.loggedInUser
            );
            this.toasterService.showSuccess('Post added successfully');
            this.close();
            this.sharedService.changeInUserDetails$.next();
        });
    }
    ////console.log({'image':'link','likes':0,'userID':loggedInUser.key,'comments':[{'userName':'harsh','description':'lorem ipsum madrid'}]})
    getLoggedInUser() {
        this.loggedInUser = this.sharedService.getLoggedInUser();
    }
}

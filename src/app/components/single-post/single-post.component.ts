import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';
import { ToasterService } from 'src/app/services/toaster.service';
@Component({
    selector: 'app-single-post',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent {
    @Input() stPost: any = '';
    @Output() noOfLikesUpdated = new EventEmitter();
    loggedInUser: any = '';
    comments: any[] = [];
    noOfLikes: number = 0;
    isModalOpen = false;
    defaultUserImage: any = Constants.userImage;
    isAlreadyLiked: boolean = false;
    userWhoLikedThePost: any[] = [];
    isWhoLikedVisible: boolean = false;
    constructor(
        private sharedService: SharedService,
        private toasterService: ToasterService,
        private route: Router
    ) {}
    ngOnInit() {
        this.getLoggedInUser();
        console.log('stpost', this.stPost);
        this.isAlreadyLiked = this.checkIfAlreadyLiked(this.stPost.likes);
        this.sharedService
            .getUserByID(this.stPost.userID)
            .subscribe((result: any) => {
                this.stPost.profileImage = result['profileImage'];
                this.stPost.fullName = result['fullName'];
                this.stPost.userName = result['userName'];
            });
        this.stPost.timePosted = this.sharedService.getRelativeTime(
            this.stPost.time
        );
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    readComments(postID: string) {
        this.sharedService.getComments(postID).subscribe((comments: any) => {
            if (comments.comments) {
                this.comments = comments.comments;
            } else {
                this.comments = [];
            }
            this.isModalOpen = true;
        });
    }

    like(post: any) {
        let likes = post.likes;
        this.isAlreadyLiked = this.checkIfAlreadyLiked(likes);
        if (this.isAlreadyLiked) {
            likes = likes.filter((userId: string) => {
                return userId != this.loggedInUser.key;
            });
        } else {
            likes.push(this.loggedInUser.key);
        }
        this.sharedService
            .likePost(post.key, likes)
            .subscribe((result: any) => {
                if (result) {
                    this.isAlreadyLiked = !this.isAlreadyLiked;
                    post.likes = result['likes'];
                    this.noOfLikesUpdated.emit(post);
                }
            });
    }

    checkIfAlreadyLiked(likesArray: any) {
        return likesArray.includes(this.loggedInUser.key);
    }

    getLoggedInUser() {
        this.loggedInUser = this.sharedService.getLoggedInUser();
    }

    viewLikes() {
        this.isWhoLikedVisible = true;
        for (let i = 1; i <= this.stPost.likes.length - 1; i++) {
            this.sharedService
                .getUserByID(this.stPost.likes[i])
                .subscribe((user) => {
                    this.userWhoLikedThePost.push(user);
                });
        }
    }
    closeLikeBox() {
        this.isWhoLikedVisible = false;
        this.userWhoLikedThePost = [];
    }

    sharePost(stPost: any) {
        const shareLink = `/post/${stPost.userID}/${stPost.key}`;
        this.copyToClipboard(shareLink);
        this.route.navigate(['/chats']);
    }

    copyToClipboard(shareLink: string) {
        const textarea = document.createElement('textarea');
        textarea.value = shareLink;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.toasterService.showSuccess(Constants.LinkCopied);
    }
}

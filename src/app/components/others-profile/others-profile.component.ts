import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-others-profile',
    templateUrl: './others-profile.component.html',
    styleUrls: ['./others-profile.component.css'],
})
export class OthersProfileComponent {
    @Input() profileID: string = '';
    userId!: any;
    postId!: any;
    user: any;
    posts: any[] = [];
    isPostVisible = false;
    isSpinnerVisible: boolean = true;
    selectedPost: any;
    constructor(
        private route: ActivatedRoute,
        private sharedService: SharedService,
        private router: Router,
        private toasterService: ToasterService
    ) {}
    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('userId');

        this.sharedService.getUserByID(this.userId).subscribe(
            (user) => {
                this.user = user;
                for (let i = 1; i <= this.user.posts.length - 1; i++) {
                    this.getPostByPostID(this.user.posts[i]);
                }
            },
            () => {},
            () => {
                this.isSpinnerVisible = false;
            }
        );
        this.showRequestedPost();
    }

    showRequestedPost() {
        this.route.queryParams.subscribe((params) => {
            this.postId = params['postId'];
            if (this.postId) {
                this.sharedService
                    .getPostByPostID(this.postId)
                    .subscribe((post: any) => {
                        this.showPost(post);
                    });
            }
        });
    }

    getPostByPostID(postID: string): void {
        this.sharedService.getPostByPostID(postID).subscribe((post: any) => {
            post.key = postID;
            this.posts.push(post);
        });
    }

    shareProfile() {
        const shareLink = `/others-profile/${this.userId}`;
        this.copyToClipboard(shareLink);
        this.router.navigate(['/chats']);
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

    showPost(post: any) {
        this.selectedPost = { ...this.user, ...post };
        this.isPostVisible = true;
    }

    hidePost() {
        this.isPostVisible = false;
    }
}

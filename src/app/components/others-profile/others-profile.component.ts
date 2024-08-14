import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-others-profile',
    templateUrl: './others-profile.component.html',
    styleUrls: ['./others-profile.component.css'],
})
export class OthersProfileComponent {
    @Input() profileID: string = '';
    userId!: any;
    user: any;
    posts: any[] = [];
    isPostVisible = false;
    isSpinnerVisible: boolean = true;
    selectedPost: any;
    constructor(
        private route: ActivatedRoute,
        private sharedService: SharedService
    ) {}
    ngOnInit() {
        console.log('onchange');

        this.userId = this.route.snapshot.paramMap.get('userId');
        this.sharedService.getUserByID(this.userId).subscribe(
            (user) => {
                this.user = user;
                console.log('user', this.user.posts);
                for (let i = 1; i <= this.user.posts.length - 1; i++) {
                    this.getPostByPostID(this.user.posts[i]);
                }
                // this.user.posts.forEach((postID: string) => {
                // this.getPostByPostID(postID);
                // });
            },
            () => {},
            () => {
                this.isSpinnerVisible = false;
            }
        );
    }

    getPostByPostID(postID: string): void {
        this.sharedService.getPostByPostID(postID).subscribe((post: any) => {
            console.log('post', post);
            this.posts.push(post);
        });
    }
    showPost(post: any) {
        this.selectedPost = { ...this.user, ...post };
        this.isPostVisible = true;
    }
    hidePost() {
        this.isPostVisible = false;
    }
}

import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
    isSpinnerVisible: boolean = true;
    limit: number = 5;
    lastKey: string | null = null;
    loading: boolean = false;
    posts: any[] = [];
    isScrolled: boolean = false;

    constructor(private sharedService: SharedService) {}

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        if (this.loading) return;
        this.loading = true;

        this.sharedService
            .getPosts(this.lastKey, this.limit)
            .subscribe((post: any) => {
                if (post.length > 0) {
                    const postLastKey = post[0].key;
                    post.reverse();
                    if (this.isScrolled) {
                        this.posts = [...this.posts, ...post.slice(1)];
                    } else {
                        this.posts = [...this.posts, ...post];
                    }
                    if (this.lastKey !== postLastKey) {
                        this.lastKey = postLastKey;
                    } else {
                        this.lastKey = null;
                    }
                } else {
                    this.lastKey = null;
                }
                this.isSpinnerVisible = false;
                this.loading = false;
            });
    }

    @HostListener('window:scroll', [])
    loadMorePost() {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight &&
            !this.loading &&
            this.lastKey
        ) {
            this.isScrolled = true;
            this.getPosts();
        }
    }
}

import { Injectable } from '@angular/core';
import { Constants } from '../shared/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map, max } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    changeInUserDetails$: any = new Subject();
    changeInUserLogin$: any = new Subject();
    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get(Constants.firebaseUrl + 'Users.json').pipe(
            map((result: any) => {
                const usersList = [];
                for (const key in result) {
                    if (result.hasOwnProperty(key)) {
                        usersList.push({ ...result[key], key });
                    }
                }
                return usersList;
            })
        );
    }

    getLoggedInUser() {
        let user: any = localStorage.getItem('user');
        user = JSON.parse(user);
        return user;
    }

    getUserByID(ID: string) {
        return this.http.get(Constants.firebaseUrl + 'Users/' + ID + '.json');
    }

    postPosts(post: any) {
        return this.http.post(Constants.firebaseUrl + 'Post.json', post);
    }

    addPostInUserDetails(postID: string) {
        let userDetails: any = {};
        userDetails = this.getLoggedInUser();
        userDetails.posts.push(postID);
        this.http
            .patch(
                Constants.firebaseUrl + 'Users/' + userDetails.key + '.json',
                { posts: [...userDetails.posts] }
            )
            .subscribe();
    }

    deletePostInUserDetails(postID: string) {
        let userDetails: any = {};
        userDetails = this.getLoggedInUser();
        let index = userDetails.posts.indexOf(postID);
        if (index !== -1) {
            userDetails.posts.splice(index, 1);
        }
        return this.http.patch(
            Constants.firebaseUrl + 'Users/' + userDetails.key + '.json',
            { posts: [...userDetails.posts] }
        );
    }

    deletePostInPosts(postId: string) {
        return this.http.delete(
            Constants.firebaseUrl + 'Post/' + postId + '.json'
        );
    }

    getPosts(lastKey: string | null, limit: number) {
        let queryParams = `orderBy="$key"&limitToLast=${limit}`;
        if (lastKey) {
            queryParams += `&endAt="${lastKey}"`;
        }

        return this.http
            .get<any[]>(`${Constants.firebaseUrl}/Post.json?${queryParams}`)
            .pipe(
                map((result: any) => {
                    const posts = [];
                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            posts.push({ ...result[key], key });
                        }
                    }
                    return posts;
                })
            );
    }

    getPostByPostID(postID: string) {
        return this.http.get(
            Constants.firebaseUrl + 'Post/' + postID + '.json'
        );
    }

    getComments(postID: string) {
        return this.http.get(
            Constants.firebaseUrl + 'Post/' + postID + '.json'
        );
    }

    likePost(postID: string, likesArray: number) {
        let post: any = {};
        return this.http.patch(
            Constants.firebaseUrl + 'Post/' + postID + '.json',
            { likes: likesArray }
        );
    }

    addComment(postID: string, comment: any) {
        return this.http.patch(
            Constants.firebaseUrl + 'Post/' + postID + '.json',
            { comments: comment }
        );
    }

    updateUserDetailsInLocalStorage(userDetail: any) {
        localStorage.setItem('user', JSON.stringify(userDetail));
    }

    editProfile(userId: string, editedProfileDetails: any) {
        return this.http.patch(
            Constants.firebaseUrl + 'Users/' + userId + '.json',
            editedProfileDetails
        );
    }

    getRelativeTime(date: string): string {
        const now = new Date();
        const postDate = new Date(date);
        const diffInSeconds = Math.floor(
            (now.getTime() - postDate.getTime()) / 1000
        );

        let interval = Math.floor(diffInSeconds / 31536000);
        if (interval >= 1) {
            return interval === 1
                ? `${interval} year ago`
                : `${interval} years ago`;
        }

        interval = Math.floor(diffInSeconds / 2592000);
        if (interval >= 1) {
            return interval === 1
                ? `${interval} month ago`
                : `${interval} months ago`;
        }

        interval = Math.floor(diffInSeconds / 86400);
        if (interval >= 1) {
            return interval === 1
                ? `${interval} day ago`
                : `${interval} days ago`;
        }

        interval = Math.floor(diffInSeconds / 3600);
        if (interval >= 1) {
            return interval === 1
                ? `${interval} hour ago`
                : `${interval} hours ago`;
        }

        interval = Math.floor(diffInSeconds / 60);
        if (interval >= 1) {
            return interval === 1
                ? `${interval} minute ago`
                : `${interval} minutes ago`;
        }

        return diffInSeconds === 1
            ? `${diffInSeconds} second ago`
            : `${diffInSeconds} seconds ago`;
    }
}

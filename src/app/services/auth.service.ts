import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isUserLoggedIn: boolean = false;

    constructor(
        private http: HttpClient,
        private sharedService: SharedService
    ) {}

    login(user: any): boolean {
        this.isUserLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(user));
        this.sharedService.changeInUserLogin$.next();
        return this.isUserLoggedIn;
    }

    logout(): boolean {
        this.isUserLoggedIn = false;
        localStorage.clear();
        this.sharedService.changeInUserLogin$.next();
        return this.isUserLoggedIn;
    }

    isUserAuthenticated() {
        console.log(
            "localStorage.getItem('user')",
            localStorage.getItem('user')
        );
        return localStorage.getItem('user') !== null;
    }
}

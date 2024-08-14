import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../shared/constants';

@Injectable({
    providedIn: 'root',
})
export class RegistrationService {
    constructor(private http: HttpClient) {}
    register(formDetails: any) {
        return this.http.post(
            Constants.firebaseUrl + 'Users.json',
            formDetails
        );
    }
}

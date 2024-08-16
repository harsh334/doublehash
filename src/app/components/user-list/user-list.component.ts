import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
    users!: any[];
    loggedInUser!: any;
    @Output() userSelected = new EventEmitter<any>();

    constructor(
        private firestore: Firestore,
        private sharedService: SharedService
    ) {}

    ngOnInit(): void {
        this.loggedInUser = this.sharedService.getLoggedInUser();
        this.loadUsers();
        console.log('loggedinuser', this.loggedInUser);
    }

    loadUsers() {
        this.sharedService.getUsers().subscribe((users: any[]) => {
            this.users = users.filter((user: any) => {
                return user.userEmail !== this.loggedInUser.userEmail;
            });
        });
    }

    selectUser(user: any) {
        this.userSelected.emit(user);
    }
}

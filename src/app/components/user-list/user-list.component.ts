import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
    users!: any[];
    filteredUsers!: any[];
    loggedInUser!: any;
    searchQuery: string = '';
    @Output() userSelected = new EventEmitter<any>();

    constructor(private sharedService: SharedService) {}

    ngOnInit(): void {
        this.loggedInUser = this.sharedService.getLoggedInUser();
        this.loadUsers();
    }

    loadUsers() {
        this.sharedService.getUsers().subscribe((users: any[]) => {
            this.users = users.filter((user: any) => {
                return user.userEmail !== this.loggedInUser.userEmail;
            });
            this.filteredUsers = this.users; // Initialize with all users
        });
    }

    filterUsers() {
        const query = this.searchQuery.toLowerCase();
        this.filteredUsers = this.users.filter((user) =>
            user.fullName.toLowerCase().includes(query)
        );
    }

    selectUser(user: any) {
        this.userSelected.emit(user);
    }
}

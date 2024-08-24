import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-top-navbar',
    templateUrl: './top-navbar.component.html',
    styleUrls: ['./top-navbar.component.css'],
})
export class TopNavbarComponent {
    searchForm!: FormGroup<any>;
    filteredUsers: any[] = [];
    defaultUserImage: any = Constants.userImage;
    isMenuOpen: boolean = false;

    constructor(private sharedService: SharedService, private route: Router) {}

    ngOnInit() {
        this.searchForm = new FormGroup({ searchText: new FormControl('') });
    }

    search() {
        const searchedText = this.searchForm
            .get('searchText')
            ?.value.toLowerCase();

        this.sharedService.getUsers().subscribe((users: any[]) => {
            const filteredUsers = users.filter((userDetail: any) => {
                return (
                    userDetail.userName.toLowerCase().includes(searchedText) ||
                    userDetail.userEmail.toLowerCase().includes(searchedText) ||
                    userDetail.fullName.toLowerCase().includes(searchedText)
                );
            });
            this.filteredUsers = filteredUsers;
        });
    }

    clearFilteredUsers() {
        this.filteredUsers = [];
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }
}

import { Component } from '@angular/core';

@Component({
    selector: 'app-chats',
    templateUrl: './chats.component.html',
    styleUrls: ['./chats.component.css'],
})
export class ChatsComponent {
    selectedUser: any;
    isSearchVisible = false;
    onUserSelected(user: any) {
        this.selectedUser = user;
        this.isSearchVisible = false;
    }
    showSearch() {
        this.isSearchVisible = true;
    }
}

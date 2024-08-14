import { Component } from '@angular/core';

@Component({
    selector: 'app-bottom-navbar',
    templateUrl: './bottom-navbar.component.html',
    styleUrls: ['./bottom-navbar.component.css'],
})
export class BottomNavbarComponent {
    isModalOpen = false;

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}

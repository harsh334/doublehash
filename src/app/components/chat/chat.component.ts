import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnChanges {
    @Input() selectedUser: any; // User selected from the user list
    messages!: Observable<any[]>;
    newMessage: string = '';
    chatId: string = '';

    constructor(
        private chatService: ChatService,
        private sharedService: SharedService
    ) {}

    ngOnInit(): void {
        // Watch for selectedUser change
        this.loadChat();
    }

    ngOnChanges() {
        if (this.selectedUser) {
            this.loadChat();
        }
    }

    async loadChat() {
        if (this.selectedUser) {
            this.chatId = await this.chatService.getOrCreateChat(
                this.selectedUser.key
            );
            this.messages = this.chatService.getMessages(this.chatId);
        }
    }

    sendMessage() {
        if (this.newMessage.trim()) {
            this.chatService
                .sendMessage(this.chatId, this.newMessage.trim())
                .then(() => {
                    this.newMessage = '';
                });
        }
    }

    isSentByCurrentUser(message: any): boolean {
        const currentUser = this.sharedService.getLoggedInUser();
        return message.senderId === currentUser?.key;
    }

    trackByFn(index: number, message: any) {
        return message.id;
    }
}

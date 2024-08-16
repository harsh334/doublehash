// import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ChatService } from 'src/app/services/chat.service';

// @Component({
//     selector: 'app-chat',
//     templateUrl: './chat.component.html',
//     styleUrls: ['./chat.component.css'],
// })
// export class ChatComponent {
//     messages!: Observable<any[]>;
//     newMessage: string = '';
//     chatId: string = 'your-chat-id-here'; // Replace with actual chatId or pass it dynamically

//     constructor(private chatService: ChatService) {}

//     ngOnInit(): void {
//         this.loadMessages();
//     }

//     loadMessages() {
//         this.messages = this.chatService.getMessages(this.chatId);
//     }

//     sendMessage() {
//         if (this.newMessage.trim()) {
//             this.chatService
//                 .sendMessage(this.chatId, this.newMessage.trim())
//                 .then(() => {
//                     this.newMessage = '';
//                 });
//         }
//     }
// }

import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
    @Input() selectedUser: any; // User selected from the user list
    messages!: Observable<any[]>;
    newMessage: string = '';
    chatId: string = '';

    constructor(private chatService: ChatService) {}

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
}

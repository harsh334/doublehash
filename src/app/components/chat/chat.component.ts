import {
    Component,
    Input,
    OnChanges,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnChanges {
    @Input() selectedUser: any;
    @ViewChild('message') message!: ElementRef;
    messages!: Observable<any[]>;
    newMessage: string = '';
    chatId: string = '';
    isSpinnerVisible: boolean = false;

    constructor(
        private chatService: ChatService,
        private sharedService: SharedService,
        private route: Router
    ) {}

    ngOnChanges() {
        if (this.selectedUser) {
            this.loadChat();
        }
    }

    async loadChat() {
        this.isSpinnerVisible = true;
        console.log('chat load start');

        if (this.selectedUser) {
            this.chatId = await this.chatService.getOrCreateChat(
                this.selectedUser.key
            );
            this.messages = this.chatService.getMessages(this.chatId);
            this.message.nativeElement.focus();
        }
        console.log('chat load end');
        this.isSpinnerVisible = false;
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

    messageContainsOthersProfileLink(message: string) {
        return message.startsWith('/others-profile/');
    }

    messageContainsPostLink(message: string) {
        return message.startsWith('/post/');
    }
    redirectToPost(message: string) {
        let userId = message.split('/')[2];
        let postId = message.split('/')[3];

        this.route.navigate([`/others-profile/${userId}`], {
            queryParams: { postId: postId, userId: userId },
        });
    }

    isSentByCurrentUser(message: any): boolean {
        const currentUser = this.sharedService.getLoggedInUser();
        return message.senderId === currentUser?.key;
    }

    trackByFn(index: number, message: any) {
        return message.id;
    }
}

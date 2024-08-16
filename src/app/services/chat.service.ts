import { Injectable } from '@angular/core';
import {
    Firestore,
    collection,
    doc,
    setDoc,
    addDoc,
    collectionData,
    query,
    where,
    getDocs,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(
        private firestore: Firestore,
        private sharedService: SharedService
    ) {}

    async getOrCreateChat(otherUserId: string): Promise<string> {
        const currentUserId = this.sharedService.getLoggedInUser()?.key;

        const chatQuery = query(
            collection(this.firestore, 'chats'),
            where('participants', 'array-contains', currentUserId)
        );
        const querySnapshot = await getDocs(chatQuery);

        // Find existing chat with the selected user
        let chatId = '';
        querySnapshot.forEach((doc) => {
            const chat = doc.data();
            if (chat['participants'].includes(otherUserId)) {
                chatId = doc.id;
            }
        });

        // If no chat found, create a new one
        if (!chatId) {
            const chatRef = await addDoc(collection(this.firestore, 'chats'), {
                participants: [currentUserId, otherUserId],
                lastMessage: null,
                timestamp: new Date(),
            });
            chatId = chatRef.id;
        }

        return chatId;
    }

    sendMessage(chatId: string, message: string) {
        const user = this.sharedService.getLoggedInUser();
        if (user) {
            const messagesCollection = collection(
                this.firestore,
                `chats/${chatId}/messages`
            );
            return addDoc(messagesCollection, {
                senderId: user.key,
                message,
                timestamp: new Date(),
            });
        }
        return Promise.resolve();
    }

    getMessages(chatId: string) {
        const messagesCollection = collection(
            this.firestore,
            `chats/${chatId}/messages`
        );
        return collectionData(messagesCollection, { idField: 'id' });
    }
}

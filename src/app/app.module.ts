import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { OthersProfileComponent } from './components/others-profile/others-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatsComponent } from './components/chats/chats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SecurityComponent } from './components/security/security.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        MainPageComponent,
        SinglePostComponent,
        BottomNavbarComponent,
        TopNavbarComponent,
        PostsComponent,
        CommentsComponent,
        ProfileComponent,
        PostComponent,
        OthersProfileComponent,
        ChatComponent,
        UserListComponent,
        ChatsComponent,
        SecurityComponent,
        AboutComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { OthersProfileComponent } from './components/others-profile/others-profile.component';
import { isUserAuthenticated } from './guards/auth-guard';
import { ChatComponent } from './components/chat/chat.component';
import { ChatsComponent } from './components/chats/chats.component';

const routes: Routes = [
    { path: '', component: PostsComponent },
    {
        path: 'register',
        component: RegisterComponent,
        // canActivate: [!isUserAuthenticated],
    },
    {
        path: 'login',
        component: LoginComponent,
        // canActivate: [!isUserAuthenticated],
    },
    { path: 'main-page', component: MainPageComponent },
    { path: 'single-post', component: SinglePostComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'comments', component: CommentsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'post', component: PostComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'chats', component: ChatsComponent },
    { path: 'others-profile/:userId', component: OthersProfileComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

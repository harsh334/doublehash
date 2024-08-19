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
import { AuthGuard } from './guards/auth-guard';
import { ChatComponent } from './components/chat/chat.component';
import { ChatsComponent } from './components/chats/chats.component';
import { SecurityComponent } from './components/security/security.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { GuestGuard } from './guards/guest-guard';

const routes: Routes = [
    { path: '', component: AboutComponent },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard],
    },
    {
        path: 'main-page',
        component: MainPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'single-post',
        component: SinglePostComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'posts',
        component: PostsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'comments',
        component: CommentsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'post',
        component: PostComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'chats',
        component: ChatsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'security',
        component: SecurityComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'others-profile/:userId',
        component: OthersProfileComponent,
        canActivate: [AuthGuard],
    },
    { path: '**', component: ErrorPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

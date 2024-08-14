import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'; 
import { MainPageComponent } from './components/main-page/main-page.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { OthersProfileComponent } from './components/others-profile/others-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    SinglePostComponent,
    SideNavbarComponent,
    BottomNavbarComponent,
    TopNavbarComponent,
    PostsComponent,
    CommentsComponent,
    ProfileComponent,
    PostComponent,
    OthersProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

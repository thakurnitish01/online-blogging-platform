import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { RegistrationComponent } from './MyComponents/registration/registration.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { NavBarComponent } from './MyComponents/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { BodyComponent } from './MyComponents/body/body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MyBlogsComponent } from './MyComponents/my-blogs/my-blogs.component';
import { AuthGuard } from './auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    NavBarComponent,
    BodyComponent,
    MyBlogsComponent
  ],
  imports: [
    BrowserModule,MatIconModule,MatDividerModule,MatButtonModule,MatSnackBarModule,
    AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule,ToggleButtonModule,
    BrowserAnimationsModule,ToastModule
  ],
  providers: [MessageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

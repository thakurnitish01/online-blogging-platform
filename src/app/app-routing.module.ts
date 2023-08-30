import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/login/login.component';
import { RegistrationComponent } from './MyComponents/registration/registration.component';
import { NavBarComponent } from './MyComponents/nav-bar/nav-bar.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { BodyComponent } from './MyComponents/body/body.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { MyBlogsComponent } from './MyComponents/my-blogs/my-blogs.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent,
  },
  {
    path : 'newuser',
    component : RegistrationComponent
  },
  {
    path : 'home',
    component : NavBarComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path  : "",
        component : BodyComponent
      },
      {
        path : "profile",
        component : ProfileComponent
      },
      {
        path : "myBlogs",
        component : MyBlogsComponent
      },
    ]
  },
  {
    path : '**',
    component : LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

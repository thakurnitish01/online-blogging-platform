import { Component } from '@angular/core';
import { UsersService } from 'src/app/MyServices/users.service';
import { NgForm } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  currentUser = '';
  loginData = {
    email: '',
    password: '',
  };
  errorMessage = '';

  constructor(
    private loginServ: UsersService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loginServ.compareLoginData(this.loginData).subscribe(
        (response: any) => {
          console.log('The Login Status:', response);
          // Redirect to the body navbar if the login is successful

          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User logged in successfully',
            });
            // Set the currentUser
            this.loginServ.setCurrentUser(response.user);
            this.router.navigate(['/home']);
            // console.log("Login Successful");
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong...',
              detail: 'User Not Found...',
            });
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password';
        }
      );
    }
  }
}

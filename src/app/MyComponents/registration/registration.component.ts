import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/MyServices/users.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  isButtonDisabled: boolean = false;

  signUpForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl(''),
    contact: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });
  currentUser: any;

  constructor(
    private newUserServ: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.currentUser = this.newUserServ.getCurrentUser();
  }

  
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
  
  Reg_Users(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      const newUserData = {
        userId : uuidv4(),
        firstname: this.signUpForm.value.firstname,
        lastname: this.signUpForm.value.lastname,
        mobile: this.signUpForm.value.contact,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      };
      this.newUserServ.userSignUp('Reg_Users', newUserData).subscribe(
        resp => {
          console.log('user added successfully..', resp);
          this.signUpForm.reset();
          this.openSnackBar('Registration successful!', 'Close');
          this.router.navigate(['']);
        },
        error => {
          console.error('Error in creating Users Account', error);
        }
      );
    } else {
      console.error('Form is invalid');
      this.openSnackBar('Invalid form submission!', 'Close');
    }
  }

}
import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/MyServices/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
currentUser : any ;

constructor(private userService : UsersService,
            private router : Router,
            private messageService :MessageService) {}

ngOnInit(): void {
  this.currentUser = this.userService.getCurrentUser();
}
logout()
{
  this.userService.setCurrentUser(null);
  this.messageService.add({
    severity: 'info',
    summary: 'Success',
    detail: 'User Logout in successfully',});
  this.router.navigate([''])
}
}

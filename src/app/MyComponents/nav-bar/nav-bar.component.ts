import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/MyServices/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedInUserName: string | undefined;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.loggedInUserName = currentUser.firstname + ' ' + currentUser.lastname;
    }
  }
}

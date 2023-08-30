import { Component, OnInit } from '@angular/core';
import { FechApiService } from 'src/app/MyServices/fech-api.service';
import { UsersService } from 'src/app/MyServices/users.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {
  data: any;
  blog: any;

  constructor(private getBlogs: UsersService, private fechBlogs: FechApiService) {}

  ngOnInit(): void {
    this.getCurrentUserBlogs();
  }

  getCurrentUserBlogs(): void {
    const userId = this.getBlogs.getCurrentUser()?.id;
    if (userId) {
      this.fechBlogs.getUserBlogs(userId).subscribe(
        response => {
          this.data = response;
        },
        error => {
          console.error("Error occurred while fetching the data", error);
        }
      );
    }
  }
}


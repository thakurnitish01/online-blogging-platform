import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FechApiService } from 'src/app/MyServices/fech-api.service';
import { UsersService } from 'src/app/MyServices/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isBookmarked: boolean = false;
  selectedImage: File | null = null; // Property for the image file
  previewUrl: string | ArrayBuffer | null = null; // Property for the image preview URL

  loggedInUserId: number | undefined;
  username: any = '';
  data: any[] = [];
  newPost: string = '';
  newPost_body: string = '';
  loggedInUserName: any;

  constructor(
    private apiService: FechApiService,
    private userService: UsersService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.setLoggedInUserName();
    this.setLoggedInUserId();
  }

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
  }

  fetchData(): void {
    this.apiService.get('users').subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  setLoggedInUserName(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.loggedInUserName = currentUser.firstname;
    }
  }

  setLoggedInUserId(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.loggedInUserId = currentUser.id;
    }
  }

  postBlog(): void {
    const userId = this.loggedInUserId;
    if (!userId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Your Account Not Found',
      });
      console.error('No user found');
      return;
    }

    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        const newData = {
          userId,
          title: this.newPost,
          body: this.newPost_body,
          postImg: base64String,
          username: this.loggedInUserName,
        };

        this.apiService.post('users', newData).subscribe(
          (response) => {
            console.log('Post successful:', response);
            this.resetForm();
            this.fetchData();
            this.messageService.add({
              severity: 'success',
              summary: 'Posted...',
              detail: 'Your Blog is Posted..',
            });
            console.log('Added Successfully');
          },
          (error) => {
            console.error('Error posting data:', error);
          }
        );
      };

      reader.readAsDataURL(this.selectedImage);
    } else {
      const newData = {
        userId,
        title: this.newPost,
        body: this.newPost_body,
        username: this.loggedInUserName,
      };

      this.apiService.post('users', newData).subscribe(
        (response) => {
          console.log('Post successful:', response);
          this.resetForm();
          this.fetchData();
          this.messageService.add({
            severity: 'success',
            summary: 'Posted...',
            detail: 'Your Blog is Posted..',
          });
          console.log('Added Successfully');
        },
        (error) => {
          console.error('Error posting data:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.newPost = '';
    this.newPost_body = '';
    this.selectedImage = null;
    this.previewUrl = null;
  }

  attachFile(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,video/*';
    fileInput.addEventListener('change', (event: any) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.selectedImage = selectedFile;
        this.previewFile(selectedFile);
      } else {
        console.log('No file selected');
      }
    });
    fileInput.click();
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  isImageFile(fileType: string): boolean {
    return fileType === 'image/jpeg' || fileType === 'image/png'; // Adjust the image formats as needed
  }
  
  isVideoFile(fileType: string): boolean {
    return fileType === 'video/mp4'; // Adjust the video format as needed
  }
  
  deletePost(postId: number): void {
    this.apiService.deletePost(postId).subscribe(
      () => {
        window.confirm("are you sure..!")
        console.log('Post deleted successfully');
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
  // current users deleting posts
  isCurrentUserPost(userId: number): boolean {
    return this.loggedInUserId === userId;
  }
}

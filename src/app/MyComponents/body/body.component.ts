import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  blogPosts: { title: string, description: string }[] = [
    {
      title : "The Angular",
      description  : "Getting Started with Angular"
    },
    {
      title : "The Management",
      description: 'The task management system'
    }
    
  ];
    

}

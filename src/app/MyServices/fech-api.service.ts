import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechApiService {
 
  // createUser(user: { firstname: any; lastname: any; contact: any; email: any; password: any; }) {
  //   throw new Error('Method not implemented.');
  // }


  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  get(users: string) {
    const url = `${this.apiUrl}/${users}`;
    return this.http.get<any>(url);

  }
  post(users: string, data: any) {
    const url = `${this.apiUrl}/${users}`;
    return this.http.post<any>(url, data)
  }

  deletePost(userId: number): Observable<void> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.delete<void>(url);
  }
  
  

  getUserBlogs(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/?userId=${userId}`);
  }
  
  
  
  

}

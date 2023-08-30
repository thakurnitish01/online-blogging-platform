import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, catchError, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {MessageService} from 'primeng/api';

@Injectable({providedIn: 'root'})
export class UsersService {
    private apiUrl = "http://localhost:3000";
    private loggedInUserName : string = '';
    currentUser : any;

    constructor(private http : HttpClient, private messageService : MessageService) {}

    userSignUp(regUsers : string, newUser : any) : Observable < any > {
        const url = `${this.apiUrl}/${regUsers}`;
        return this.http.post < any > (url, newUser).pipe(map(response => {
            this
                .messageService
                .add({severity: 'success', summary: 'Success', detail: 'User signed up successfully'});
            return response;
        }), catchError(error => {
            this
                .messageService
                .add({severity: 'error', summary: 'Error', detail: 'Failed to sign up user'});
            console.error('Error signing up user:', error);
            return of(null);
        }));
    }

    compareLoginData(loginData: { email: string, password: string }): Observable <any> {
        const email = loginData.email;
        const password = loginData.password;
        const url = `${this.apiUrl}/reg_users`;
      
        return this.http.get<any[]>(url).pipe(
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to retrieve user data' });
            console.error('Error retrieving user data:', error);
            return [];
          }),
          switchMap(reg_users => {
            const user = reg_users.find(user => user.email === email && user.password === password);
            if (user) {
              return this.http.get<any>(`${this.apiUrl}/reg_users/${user.id}`).pipe(
                map(response => {
                  this.loggedInUserName = response.firstname;
                  return { success: true, user: response };
                })
              );
            } else {
              return of({ success: false, message: 'Invalid email or password' });
            }
          })
        );
      }

    getLoggedInUserName() : Observable < string > {
        return of(this.loggedInUserName);
    }

    setCurrentUser(user: any): void {
        this.currentUser = user;
      }
    
      getCurrentUser(): any {
        return this.currentUser;
      }
}

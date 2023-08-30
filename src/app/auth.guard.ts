import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from './MyServices/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, 
              private userService: UsersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  
    // const isAuthenticated = true; 
    
    if (this.userService.getCurrentUser()) {
      return true; 
    } else {
      window.alert("Premission Denied")
      this.router.navigate([''])
      return false;
      
    }
  }
}

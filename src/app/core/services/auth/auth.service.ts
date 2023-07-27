import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Observable, of, throwError } from 'rxjs';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { UserRole } from '../../enums/user-roles.enum';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
  |--------------------------------------------------
  | Static user list
  |--------------------------------------------------
  */
  users: User[] = [
    { id: 1, username: 'user', password: 'user', role: 2 },
    { id: 2, username: 'admin', password: 'admin', role: 1 },
  ];

  constructor(private router: Router) {}

  /**
  |--------------------------------------------------
  | login method
  |--------------------------------------------------
  */
  login(data: LoginRequest): Observable<User> {
    let user = this.users.find((u) => u.username === data.username);
    if (user && user.password === data.password) {
      localStorage.setItem('userData', JSON.stringify(user));
      return of(user);
    }
    return throwError(() => {
      return { message: 'Wrong username or password' };
    });
  }

  /**
  |--------------------------------------------------
  | logout method
  |--------------------------------------------------
  */
  logout() {
    // remove user from local storage to log user out and navigate to login
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  /**
  |--------------------------------------------------
  | Check if user is admin
  |--------------------------------------------------
  */
  isAdmin(): boolean {
    return this.isLoggedIn()!!.role === UserRole.Admin || false;
  }

  /**
  |--------------------------------------------------
  | Check if user logged in
  |--------------------------------------------------
  */
  isLoggedIn(): User | null {
    let userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }
}

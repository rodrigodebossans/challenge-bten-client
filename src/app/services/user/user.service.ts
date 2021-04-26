import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/user', user);
  }

  authenticate(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/auth', user).pipe(
      map((authenticatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
        return authenticatedUser;
      })
    );
  }

  logout(): void {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
  }

  getStoredUser(): User | null {
    if (localStorage) {
      const currentUser: string = localStorage.getItem('currentUser') || '';

      if (currentUser) {
        return JSON.parse(currentUser);
      }
    }

    return null;
  }

  isAuthenticated(): boolean {
    const user: User | null = this.getStoredUser();
    return !this.jwtHelper.isTokenExpired(user?.token);
  }
}

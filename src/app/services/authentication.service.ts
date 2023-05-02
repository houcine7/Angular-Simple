import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  users: User[] = [];

  authenticatedUser: User | undefined;

  constructor() {
    this.users.push({
      username: 'user1',
      password: 'password',
      roles: ['USER'],
      id: 752102,
    });
    this.users.push({
      username: 'admin',
      password: 'password',
      roles: ['USER', 'ADMIN'],
      id: 564791,
    });
  }

  login(username: string, password: string): Observable<User> {
    const user = this.users.find((user) => user.username == username);

    if (!user) {
      return throwError(
        () => new Error("can't find user with username" + username)
      );
    }

    if (user.password == password) {
      return of(user);
    }

    return throwError(() => new Error('password is incorrect'));
  }

  authenticate(user: User): Observable<boolean> {
    //

    localStorage.setItem(
      'user',
      JSON.stringify({
        username: user.username,
        roles: user.roles,
      })
    );
    this.authenticatedUser = user;
    return of(true);
  }

  hasRole(role: string): boolean {
    if (this.authenticatedUser?.roles.includes(role)) return true;
    else return false;
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('user') != null) {
      this.authenticatedUser = this.users.find(
        (user) =>
          user.username == JSON.parse(localStorage.getItem('user')!).username
      );
      return true;
    }

    return false;
  }

  logout(): boolean {
    this.authenticatedUser = undefined;
    localStorage.removeItem('user');
    return true;
  }
}

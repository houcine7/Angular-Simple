import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  users: User[] = [];

  authenticatedUser!: User;

  constructor() {
    this.users.push({
      username: 'user1',
      password: 'password',
      roles: ['user'],
      id: 752102,
    });
    this.users.push({
      username: 'admin',
      password: 'password',
      roles: ['user', 'admin'],
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
    return this.authenticatedUser?.roles.includes(role);
  }

  isAuthenticated(): boolean {
    return this.authenticatedUser != undefined;
  }
}

import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  authenticatedUser: User | undefined;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authenticatedUser = this.authService.authenticatedUser;
  }

  logout = (): void => {
    if (this.authService.logout()) {
      this.router.navigateByUrl('/login');
    }
  };
}

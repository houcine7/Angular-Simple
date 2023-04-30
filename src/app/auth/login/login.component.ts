import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username: this.fb.control(null),
      password: this.fb.control(null),
    });
  }

  login = (): void => {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;

    this.authenticationService.login(username, password).subscribe({
      next: (user) => {
        this.authenticationService.authenticate(user).subscribe({
          next: (data) => {
            ///
            this.router.navigateByUrl('/products');
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
}

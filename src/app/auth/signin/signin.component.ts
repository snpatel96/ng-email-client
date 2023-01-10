import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SigninCredentials } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signinForm.invalid) return;

    this.authService
      .signin(this.signinForm.value as SigninCredentials)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/inbox');
        },
        error: ({ error }) => {
          if (error.username || error.password) {
            this.signinForm.setErrors({ credentials: true });
          }
        },
      });
  }
}

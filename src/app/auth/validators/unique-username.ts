import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (formControl: AbstractControl): any => {
    const { value } = formControl;
    return this.authService.usernameAvailable(value).pipe(
      map((value) => {
        return null;
      }),

      catchError((err) => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}

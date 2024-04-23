import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser, IUserLogin } from '../../models/interfaces';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public isLogIn = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
  });

  public submit() {
    if (this.isLogIn) {
      this.loginForm.markAsTouched();
      if (this.loginForm.valid) {
        const user: IUserLogin = {
          login: this.loginForm.value.login ?? '',
          password: this.loginForm.value.password ?? '',
        };
        if (this.authService.login(user))
          // this.authService.login(user).subscribe((v) => {
          this.router.navigate(['/board']);
        // });
      }
    } else {
      this.registerForm.markAsTouched();
      if (this.registerForm.valid) {
        const user: IUser = {
          login: this.registerForm.value.login ?? '',
          password: this.registerForm.value.password ?? '',
          email: this.registerForm.value.email ?? '',
        };
        if (this.authService.register(user))
          // this.authService.register(user).subscribe((v) => {
          //   console.log(v);
          this.router.navigate(['/board']);
        // });
      }
    }
  }
}

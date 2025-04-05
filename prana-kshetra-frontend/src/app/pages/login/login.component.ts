import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ✅ Toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // ✅ Handle Login Form Submission
  onLogin(form: NgForm): void {
    if (form.invalid || this.isLoading) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('✅ Login success:', res);

        // Save JWT & User Data to LocalStorage (or Service)
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.user);

        // Role-based redirection
        const userRole = res.user.role;
        if (userRole === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (userRole === 'user') {
          this.router.navigate(['/user/dashboard']);
        } else {
          this.router.navigate(['/']); // fallback
        }

        this.isLoading = false;

        // Optional: welcome message
        alert(`Welcome, ${res.user.name}!`);
      },

      error: (err: any) => {
        console.error('❌ Login error:', err);
        this.errorMessage = err.error?.message || 'Login failed! Please check your credentials.';
        this.isLoading = false;
      }
    });
  }
}

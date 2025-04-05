import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onRegister(form: NgForm): void {
    if (form.invalid) return;

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Call the backend register API through the auth service
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('Registration success:', res);
        // Redirect to login page after successful registration ✅
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Registration error:', err);
        this.errorMessage = err.error?.message || 'Registration failed!';
      }
    });
  }
}

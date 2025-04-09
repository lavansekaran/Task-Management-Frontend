import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  // Create a reactive form with email, password, and password confirmation fields
  // Email field validates for required input and correct email format
  // Password field requires minimum 6 characters
  // Confirm password field is required
  // Form level validation ensures passwords match
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  // Custom validator to ensure password and confirm password fields match
  // Returns null if passwords match or fields are pristine
  // Returns error object if passwords don't match
  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Skip validation if either field hasn't been modified
    if (password?.pristine || confirmPassword?.pristine) {
      return null;
    }

    // Return error if passwords don't match, null if they do
    return password && confirmPassword && password.value !== confirmPassword.value ? 
      { 'passwordMismatch': true } : null;
  }

  // Main registration function that handles form submission
  register() {
    if (this.registerForm.valid) {
      // If form is valid, extract form data and call auth service
      const data = this.registerForm.value;
      this.auth.register(data).subscribe({
        next: () => this.router.navigate(['/login']), // Redirect to login page on success
        error: (error) => {
          // Handle registration failure
          console.error('Registration failed:', error);
        }
      });
    } else {
      // If form is invalid, mark all fields as touched to trigger validation messages
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  // Create a reactive form with email and password fields
  // Email field validates for required input and correct email format
  // Password field validates for required input
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  // Helper function to decode JWT token
  // Takes a JWT token string and returns the decoded payload
  // Returns null if decoding fails
  private decodeToken(token: string) {
    try {
      // Split token into parts and get the payload (second part)
      const base64Url = token.split('.')[1];
      // Convert base64url to regular base64
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      // Decode and parse the JSON payload
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Main login function that handles form submission
  login() {
    // Only proceed if the form is valid
    if (this.loginForm.valid) {
      // Call the authentication service's login method
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          // Store the JWT token in localStorage for persistence
          localStorage.setItem('token', res.token);
          
          // Decode the token and extract user information
          const decodedToken = this.decodeToken(res.token);
          if (decodedToken) {
            // Create a user data object from token claims
            const userData = {
              userId: decodedToken.userId,
              // Token expiration timestamp
              exp: decodedToken.exp,
              // Token issued at timestamp
              iat: decodedToken.iat
            };
            // Store user data in localStorage for easy access
            localStorage.setItem('userData', JSON.stringify(userData));
          }
          
          // Redirect to task list page after successful login
          this.router.navigate(['/task-list']);
        },
        error: (error) => {
          // Handle login failure
          console.error('Login failed:', error);
          alert('Invalid email or password. Please try again.');
        }
      });
    }
  }
}


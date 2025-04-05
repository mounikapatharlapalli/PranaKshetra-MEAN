import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isLoggedIn = false;
  username: string = ''; // We'll show this in the navbar

  private authSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();

    if (this.isLoggedIn) {
      this.setUserDetails();
    }

    // Listen for login/logout events
    this.authSub = this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;

      if (status) {
        this.setUserDetails();
      } else {
        this.username = '';
      }
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  private setUserDetails() {
    const user = this.authService.getUser();
    console.log('User loaded in navbar:', user);

    if (user) {
      this.username = user.email || 'User';
    }
  }
}

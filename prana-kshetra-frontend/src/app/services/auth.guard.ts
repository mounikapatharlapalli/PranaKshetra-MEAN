import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    // ✅ Check authentication
    if (!this.authService.isAuthenticated()) {
      console.log('Not authenticated, redirecting to login.');
      return this.router.parseUrl('/login');
    }

    // ✅ Role-based protection (example: admin-only routes)
    const user = this.authService.getCurrentUser();
    console.log('AuthGuard user:', user);

    const isAdminRoute = state.url.startsWith('/admin');

    if (isAdminRoute && user?.role !== 'admin') {
      console.log('Access denied: Admins only');
      return this.router.parseUrl('/');
    }

    return true;
  }
}

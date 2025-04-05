import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;
  private apiUrl = `${environment.apiUrl}/auth`;

  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatusSubject.asObservable();

  // 🔥 Added for Redirect URL
  private redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // ✅ Register
  register(name: string, email: string, password: string): Observable<any> {
    if (!this.isBrowser) {
      return throwError(() => new Error('Not in browser'));
    }

    const body = { name, email, password, role: 'user' };

    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      map(res => res),
      catchError(error => throwError(() => error))
    );
  }

  // ✅ Login
  login(email: string, password: string): Observable<any> {
    if (!this.isBrowser) {
      return throwError(() => new Error('Not in browser'));
    }

    const body = { email, password };

    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      map(res => {
        const { token, user } = res;

        if (token) {
          this.saveToken(token);
          this.saveUser(user);
        }

        return { token, user };
      }),
      catchError(error => throwError(() => error))
    );
  }

  // ✅ Save Token
  saveToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('authToken', token);
      this.authStatusSubject.next(true);
    }
  }

  // ✅ Save User
  saveUser(user: any): void {
    if (this.isBrowser) {
      localStorage.setItem('authUser', JSON.stringify(user));
    }
  }

  // ✅ Get Current User
  getUser(): any {
    if (!this.isBrowser) return null;

    const userStr = localStorage.getItem('authUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user JSON:', error);
        this.logout();
        return null;
      }
    }
    return null;
  }

  getCurrentUser(): any {
    return this.getUser();
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) return false;

    const token = localStorage.getItem('authToken');
    return !!token;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      this.authStatusSubject.next(false);
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  // 🔥 Set Redirect URL
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  // 🔥 Get Redirect URL
  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }
}

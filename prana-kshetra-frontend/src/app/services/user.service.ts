import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) { }

  // Get all users (Admin only)
  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token'); // Or your preferred auth system
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/all`, { headers });
  }

  // Delete user (optional later)
  deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/${userId}`, { headers });
  }
}
